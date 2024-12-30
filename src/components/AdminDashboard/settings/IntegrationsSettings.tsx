import React from 'react';
import { Save } from 'lucide-react';
import { ExternalIntegrations } from '../../../types/settings';

interface IntegrationsSettingsProps {
  settings: ExternalIntegrations;
  onSave: (settings: ExternalIntegrations) => Promise<void>;
}

export default function IntegrationsSettings({ settings, onSave }: IntegrationsSettingsProps) {
  const [formData, setFormData] = React.useState(settings);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Google Maps Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Google Maps Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="text"
              value={formData.googleMaps.apiKey}
              onChange={(e) => setFormData({
                ...formData,
                googleMaps: { ...formData.googleMaps, apiKey: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <input
              type="text"
              value={formData.googleMaps.region}
              onChange={(e) => setFormData({
                ...formData,
                googleMaps: { ...formData.googleMaps, region: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Razorpay Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Razorpay Integration</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key ID
            </label>
            <input
              type="text"
              value={formData.razorpay.keyId}
              onChange={(e) => setFormData({
                ...formData,
                razorpay: { ...formData.razorpay, keyId: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Secret
            </label>
            <input
              type="password"
              value={formData.razorpay.keySecret}
              onChange={(e) => setFormData({
                ...formData,
                razorpay: { ...formData.razorpay, keySecret: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Webhook Secret
            </label>
            <input
              type="password"
              value={formData.razorpay.webhookSecret}
              onChange={(e) => setFormData({
                ...formData,
                razorpay: { ...formData.razorpay, webhookSecret: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* SMTP Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email (SMTP) Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMTP Host
            </label>
            <input
              type="text"
              value={formData.smtp.host}
              onChange={(e) => setFormData({
                ...formData,
                smtp: { ...formData.smtp, host: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMTP Port
            </label>
            <input
              type="number"
              value={formData.smtp.port}
              onChange={(e) => setFormData({
                ...formData,
                smtp: { ...formData.smtp, port: parseInt(e.target.value) }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.smtp.username}
              onChange={(e) => setFormData({
                ...formData,
                smtp: { ...formData.smtp, username: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.smtp.password}
              onChange={(e) => setFormData({
                ...formData,
                smtp: { ...formData.smtp, password: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Email
            </label>
            <input
              type="email"
              value={formData.smtp.fromEmail}
              onChange={(e) => setFormData({
                ...formData,
                smtp: { ...formData.smtp, fromEmail: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Name
            </label>
            <input
              type="text"
              value={formData.smtp.fromName}
              onChange={(e) => setFormData({
                ...formData,
                smtp: { ...formData.smtp, fromName: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.smtp.secure}
                onChange={(e) => setFormData({
                  ...formData,
                  smtp: { ...formData.smtp, secure: e.target.checked }
                })}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Use Secure Connection (TLS)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}