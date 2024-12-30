/*
  # Vendor Commission and Payout System

  1. New Tables
    - vendor_commission_settings
      - Stores commission rates and payout rules for each vendor
      - Configurable commission rates and minimum payout thresholds
      - Customizable payout schedules
    
    - vendor_earnings
      - Tracks earnings from bookings
      - Calculates commission and net earnings
      - Links to bookings and vendors
    
    - vendor_payouts
      - Records all payout transactions
      - Tracks payout status and transaction details
      - Maintains audit trail

  2. Security
    - Enable RLS on all tables
    - Vendors can view their own data
    - Admins can manage all records
*/

-- Create tables in correct order
CREATE TABLE IF NOT EXISTS vendor_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendor_profiles(id) NOT NULL,
  amount decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payout_method text NOT NULL,
  transaction_id text,
  bank_reference text,
  notes text,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_payout_amount CHECK (amount > 0),
  CONSTRAINT valid_payout_status CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
);

CREATE TABLE IF NOT EXISTS vendor_commission_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendor_profiles(id) NOT NULL,
  commission_rate decimal NOT NULL DEFAULT 10.0,
  minimum_payout decimal NOT NULL DEFAULT 100.0,
  payout_schedule text NOT NULL DEFAULT 'monthly',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_commission_rate CHECK (commission_rate >= 0 AND commission_rate <= 100),
  CONSTRAINT valid_minimum_payout CHECK (minimum_payout >= 0)
);

CREATE TABLE IF NOT EXISTS vendor_earnings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendor_profiles(id) NOT NULL,
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  gross_amount decimal NOT NULL,
  commission_amount decimal NOT NULL,
  net_amount decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payout_id uuid REFERENCES vendor_payouts(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_amounts CHECK (
    gross_amount >= 0 AND
    commission_amount >= 0 AND
    net_amount >= 0 AND
    commission_amount <= gross_amount AND
    net_amount = gross_amount - commission_amount
  )
);

-- Enable RLS
ALTER TABLE vendor_commission_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_payouts ENABLE ROW LEVEL SECURITY;

-- Policies for vendor_commission_settings
CREATE POLICY "Vendors can view their own commission settings"
  ON vendor_commission_settings
  FOR SELECT
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage commission settings"
  ON vendor_commission_settings
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'is_admin' = 'true');

-- Policies for vendor_earnings
CREATE POLICY "Vendors can view their own earnings"
  ON vendor_earnings
  FOR SELECT
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage earnings"
  ON vendor_earnings
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'is_admin' = 'true');

-- Policies for vendor_payouts (without duplicate policy)
CREATE POLICY "Admins can manage payouts"
  ON vendor_payouts
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'is_admin' = 'true');

-- Function to calculate earnings
CREATE OR REPLACE FUNCTION calculate_vendor_earnings()
RETURNS TRIGGER AS $$
DECLARE
  v_commission_rate decimal;
  v_vendor_id uuid;
BEGIN
  -- Get vendor ID from the venue
  SELECT vendor_id INTO v_vendor_id
  FROM venues
  WHERE id = NEW.venue_id;

  -- Get commission rate
  SELECT commission_rate INTO v_commission_rate
  FROM vendor_commission_settings
  WHERE vendor_id = v_vendor_id;

  -- If no commission rate is set, use default 10%
  IF v_commission_rate IS NULL THEN
    v_commission_rate := 10.0;
  END IF;

  -- Calculate earnings
  INSERT INTO vendor_earnings (
    vendor_id,
    booking_id,
    gross_amount,
    commission_amount,
    net_amount
  ) VALUES (
    v_vendor_id,
    NEW.id,
    NEW.total_amount,
    (NEW.total_amount * v_commission_rate / 100),
    (NEW.total_amount * (100 - v_commission_rate) / 100)
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate earnings after booking
CREATE TRIGGER calculate_vendor_earnings_after_booking
  AFTER INSERT ON bookings
  FOR EACH ROW
  WHEN (NEW.status = 'confirmed')
  EXECUTE FUNCTION calculate_vendor_earnings();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update timestamp triggers
CREATE TRIGGER update_vendor_commission_settings_updated_at
  BEFORE UPDATE ON vendor_commission_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_earnings_updated_at
  BEFORE UPDATE ON vendor_earnings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_payouts_updated_at
  BEFORE UPDATE ON vendor_payouts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default commission settings for existing vendors
INSERT INTO vendor_commission_settings (vendor_id)
SELECT id FROM vendor_profiles
WHERE id NOT IN (SELECT vendor_id FROM vendor_commission_settings);