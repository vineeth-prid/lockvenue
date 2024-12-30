import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface NotificationSettings {
  email: {
    bookings: boolean;
    payouts: boolean;
    reviews: boolean;
    updates: boolean;
  };
  push: {
    bookings: boolean;
    payouts: boolean;
    reviews: boolean;
    updates: boolean;
  };
}

export function useVendorNotifications() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('vendor_profiles')
      .select('notification_preferences')
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setSettings(data.notification_preferences);
    }
    setLoading(false);
  };

  const updateSettings = async (newSettings: NotificationSettings) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('vendor_profiles')
      .update({ notification_preferences: newSettings })
      .eq('user_id', user.id);

    if (!error) {
      setSettings(newSettings);
      return true;
    }
    return false;
  };

  return {
    settings,
    updateSettings,
    loading
  };
}