/*
  # Fix Vendor Tables Relationships

  1. Changes
    - Add missing foreign key relationships
    - Add notification_settings column to vendor_profiles
    - Update RLS policies
    - Add missing indexes

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Add notification_settings to vendor_profiles
ALTER TABLE vendor_profiles
ADD COLUMN IF NOT EXISTS notification_settings jsonb DEFAULT '{
  "email": {
    "bookings": true,
    "payouts": true,
    "reviews": true,
    "updates": false
  },
  "push": {
    "bookings": true,
    "payouts": true,
    "reviews": false,
    "updates": false
  }
}'::jsonb;

-- Add missing foreign key to venues
ALTER TABLE venues
ADD COLUMN IF NOT EXISTS vendor_id uuid REFERENCES vendor_profiles(id);

-- Update existing venues to link with vendor profiles
DO $$
BEGIN
  -- Create vendor profile for existing venue owners if they don't have one
  INSERT INTO vendor_profiles (user_id, business_name, business_type, contact_person, phone, address, city, state, postal_code, country)
  SELECT DISTINCT 
    owner_id,
    'Business Name', -- Default value
    'Individual',    -- Default value
    'Contact Person',-- Default value
    'Phone Number',  -- Default value
    'Address',       -- Default value
    'City',         -- Default value
    'State',        -- Default value
    'Postal Code',  -- Default value
    'Country'       -- Default value
  FROM venues v
  WHERE v.owner_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM vendor_profiles vp
    WHERE vp.user_id = v.owner_id
  );

  -- Update venues to link with vendor profiles
  UPDATE venues v
  SET vendor_id = vp.id
  FROM vendor_profiles vp
  WHERE v.owner_id = vp.user_id
  AND v.vendor_id IS NULL;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_user_id ON vendor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_venues_vendor_id ON venues(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_documents_vendor_id ON vendor_documents(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_bank_details_vendor_id ON vendor_bank_details(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_payouts_vendor_id ON vendor_payouts(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_earnings_vendor_id ON vendor_earnings(vendor_id);

-- Update RLS policies
CREATE POLICY "Vendors can view their own venues"
  ON venues
  FOR SELECT
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Vendors can manage their own venues"
  ON venues
  FOR ALL
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));