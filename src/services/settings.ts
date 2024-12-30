import { supabase } from '../lib/supabaseClient';
import type { SystemSettings } from '../types/settings';

export async function getSystemSettings(): Promise<SystemSettings | null> {
  const { data, error } = await supabase
    .from('system_settings')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching system settings:', error);
    return null;
  }

  return data;
}

export async function updateSystemSettings(settings: SystemSettings): Promise<boolean> {
  const { error } = await supabase
    .from('system_settings')
    .upsert([settings]);

  if (error) {
    console.error('Error updating system settings:', error);
    return false;
  }

  return true;
}