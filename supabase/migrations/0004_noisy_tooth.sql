/*
  # Add Vendor Management Tables

  1. New Tables
    - vendor_profiles
    - vendor_documents
    - vendor_bank_details
    - vendor_payouts
  
  2. Security
    - Enable RLS
    - Add policies for vendor access
*/

-- Vendor Profiles
CREATE TABLE IF NOT EXISTS vendor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  business_name text NOT NULL,
  business_type text NOT NULL,
  tax_id text,
  contact_person text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  verification_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vendor Documents
CREATE TABLE IF NOT EXISTS vendor_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendor_profiles(id) NOT NULL,
  document_type text NOT NULL,
  document_url text NOT NULL,
  verification_status text NOT NULL DEFAULT 'pending',
  verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vendor Bank Details
CREATE TABLE IF NOT EXISTS vendor_bank_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendor_profiles(id) NOT NULL,
  account_holder_name text NOT NULL,
  account_number text NOT NULL,
  bank_name text NOT NULL,
  branch_name text NOT NULL,
  ifsc_code text NOT NULL,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vendor Payouts
CREATE TABLE IF NOT EXISTS vendor_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendor_profiles(id) NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payout_date timestamptz,
  transaction_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_bank_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_payouts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Vendors can view their own profile"
  ON vendor_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Vendors can update their own profile"
  ON vendor_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Vendors can view their own documents"
  ON vendor_documents
  FOR SELECT
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Vendors can manage their own documents"
  ON vendor_documents
  FOR ALL
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Vendors can view their own bank details"
  ON vendor_bank_details
  FOR SELECT
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Vendors can manage their own bank details"
  ON vendor_bank_details
  FOR ALL
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Vendors can view their own payouts"
  ON vendor_payouts
  FOR SELECT
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
  ));