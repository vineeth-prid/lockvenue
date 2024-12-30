-- Add notification_preferences column to vendor_profiles if it doesn't exist
ALTER TABLE vendor_profiles 
ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{
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

-- Add profile_settings column to vendor_profiles if it doesn't exist
ALTER TABLE vendor_profiles
ADD COLUMN IF NOT EXISTS profile_settings jsonb DEFAULT '{
  "businessHours": {
    "monday": { "start": "09:00", "end": "17:00" },
    "tuesday": { "start": "09:00", "end": "17:00" },
    "wednesday": { "start": "09:00", "end": "17:00" },
    "thursday": { "start": "09:00", "end": "17:00" },
    "friday": { "start": "09:00", "end": "17:00" },
    "saturday": { "start": "", "end": "" },
    "sunday": { "start": "", "end": "" }
  },
  "preferences": {
    "language": "en",
    "timezone": "UTC",
    "currency": "USD"
  }
}'::jsonb;

-- Update RLS policies
DROP POLICY IF EXISTS "Vendors can update their own profile" ON vendor_profiles;
CREATE POLICY "Vendors can update their own profile"
  ON vendor_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_notification_preferences 
ON vendor_profiles USING gin (notification_preferences);

CREATE INDEX IF NOT EXISTS idx_vendor_profiles_profile_settings
ON vendor_profiles USING gin (profile_settings);