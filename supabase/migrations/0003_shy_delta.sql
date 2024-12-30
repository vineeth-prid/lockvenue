/*
  # Create system settings table
  
  1. New Tables
    - `system_settings`
      - `id` (uuid, primary key)
      - `company` (jsonb) - Company information and social media links
      - `integrations` (jsonb) - External integration settings (SMTP, Google Maps, Razorpay)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `system_settings` table
    - Add policy for admin users to manage settings
    - Add policy for authenticated users to read settings
*/

CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company jsonb NOT NULL DEFAULT '{
    "name": "",
    "email": "",
    "phone": "",
    "address": "",
    "socialMedia": {
      "facebook": "",
      "twitter": "",
      "instagram": "",
      "linkedin": ""
    }
  }'::jsonb,
  integrations jsonb NOT NULL DEFAULT '{
    "googleMaps": {
      "apiKey": "",
      "region": ""
    },
    "razorpay": {
      "keyId": "",
      "keySecret": "",
      "webhookSecret": ""
    },
    "smtp": {
      "host": "",
      "port": 587,
      "username": "",
      "password": "",
      "fromEmail": "",
      "fromName": "",
      "secure": true
    }
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admin users can manage system settings"
  ON system_settings
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'is_admin' = 'true');

CREATE POLICY "Authenticated users can read system settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default settings if table is empty
INSERT INTO system_settings (id)
SELECT gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM system_settings);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON system_settings
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();