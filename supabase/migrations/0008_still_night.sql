/*
  # Fix Vendor Profiles and Users Relationship

  1. Changes
    - Add proper foreign key relationship between vendor_profiles and auth.users
    - Add missing indexes and constraints
    - Update RLS policies for better security
    - Add missing columns for vendor management

  2. Security
    - Enable RLS
    - Add policies for vendors and admins
*/

-- Drop existing foreign key if it exists
ALTER TABLE vendor_profiles 
DROP CONSTRAINT IF EXISTS vendor_profiles_user_id_fkey;

-- Add proper foreign key to auth.users
ALTER TABLE vendor_profiles
ADD CONSTRAINT vendor_profiles_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id)
ON DELETE CASCADE;

-- Add missing status columns if they don't exist
ALTER TABLE vendor_profiles
ADD COLUMN IF NOT EXISTS verification_status text NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
ADD CONSTRAINT valid_verification_status CHECK (verification_status IN ('pending', 'verified', 'rejected')),
ADD CONSTRAINT valid_status CHECK (status IN ('pending', 'active', 'suspended'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_status ON vendor_profiles(status);
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_verification_status ON vendor_profiles(verification_status);

-- Update RLS policies
DROP POLICY IF EXISTS "Vendors can view their own profile" ON vendor_profiles;
DROP POLICY IF EXISTS "Admins can view all vendor profiles" ON vendor_profiles;

-- Policy for vendors to view their own profile
CREATE POLICY "Vendors can view their own profile"
ON vendor_profiles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Policy for admins to view all vendor profiles
CREATE POLICY "Admins can view all vendor profiles"
ON vendor_profiles
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'is_admin' = 'true');

-- Add function to get vendor profile with user details
CREATE OR REPLACE FUNCTION get_vendor_profile_with_user(vendor_id uuid)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'id', vp.id,
    'user_id', vp.user_id,
    'business_name', vp.business_name,
    'status', vp.status,
    'verification_status', vp.verification_status,
    'user', json_build_object(
      'email', u.email,
      'created_at', u.created_at
    )
  )
  FROM vendor_profiles vp
  JOIN auth.users u ON u.id = vp.user_id
  WHERE vp.id = vendor_id;
$$;