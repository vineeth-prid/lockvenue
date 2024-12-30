import React, { useState, useEffect } from 'react';
import { DollarSign, Save } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface CommissionSettingsProps {
  vendorId: string;
}

export default function CommissionSettings({ vendorId }: CommissionSettingsProps) {
  const [settings, setSettings] = useState({
    commissionRate: 10,
    minimumPayout: 100,
    payoutSchedule: 'monthly'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCommissionSettings();
  }, [vendorId]);

  const loadCommissionSettings = async () => {
    const { data, error } = await supabase
      .from('vendor_commission_settings')
      .select('*')
      .eq('vendor_id', vendorId)
      .single();

    if (!error && data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from('vendor_commission_settings')
        .upsert({
          vendor_id: vendorId,
          ...settings
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving commission settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Commission Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commission Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={settings.commissionRate}
              onChange={(e) => setSettings({
                ...settings,
                commissionRate: parseFloat(e.target.value)
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Payout Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={settings.minimumPayout}
              onChange={(e) => setSettings({
                ...settings,
                minimumPayout: parseInt(e.target.value)
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payout Schedule
            </label>
            <select
              value={settings.payoutSchedule}
              onChange={(e) => setSettings({
                ...settings,
                payoutSchedule: e.target.value
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}