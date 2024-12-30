import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface VendorProfile {
  businessName: string;
  contactPerson: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function useVendorProfile() {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('vendor_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setProfile({
        businessName: data.business_name,
        contactPerson: data.contact_person,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postal_code,
        country: data.country
      });
    }
    setLoading(false);
  };

  const updateProfile = async (newProfile: VendorProfile) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('vendor_profiles')
      .update({
        business_name: newProfile.businessName,
        contact_person: newProfile.contactPerson,
        phone: newProfile.phone,
        address: newProfile.address,
        city: newProfile.city,
        state: newProfile.state,
        postal_code: newProfile.postalCode,
        country: newProfile.country
      })
      .eq('user_id', user.id);

    if (!error) {
      setProfile(newProfile);
      return true;
    }
    return false;
  };

  return {
    profile,
    updateProfile,
    loading
  };
}