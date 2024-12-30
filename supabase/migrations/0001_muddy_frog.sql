/*
  # Initial Schema Setup for Venue Booking Platform

  1. New Tables
    - users
      - Basic user information and authentication
    - venues
      - Venue details and properties
    - bookings
      - Booking records and payment status
    - venue_images
      - Images associated with venues
    - reviews
      - User reviews for venues

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  phone_number text,
  is_venue_owner boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Venues Table
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES users(id),
  name text NOT NULL,
  description text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  capacity integer NOT NULL,
  price_per_hour numeric NOT NULL,
  amenities jsonb DEFAULT '[]',
  availability_schedule jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid REFERENCES venues(id),
  user_id uuid REFERENCES users(id),
  booking_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  total_amount numeric NOT NULL,
  advance_amount numeric NOT NULL,
  payment_status text DEFAULT 'pending',
  razorpay_order_id text,
  razorpay_payment_id text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Venue Images Table
CREATE TABLE IF NOT EXISTS venue_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid REFERENCES venues(id),
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid REFERENCES venues(id),
  user_id uuid REFERENCES users(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Venues are readable by everyone"
  ON venues
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Venue owners can manage their venues"
  ON venues
  FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can read their bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Venue images are readable by everyone"
  ON venue_images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Reviews are readable by everyone"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());