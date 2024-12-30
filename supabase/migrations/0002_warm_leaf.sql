/*
  # Set admin user

  1. Changes
    - Sets admin status for specific user email
  
  2. Security
    - Updates user metadata to grant admin privileges
*/

DO $$ 
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{is_admin}',
    'true'
  )
  WHERE email = 'vini.roks@gmail.com';
END $$;