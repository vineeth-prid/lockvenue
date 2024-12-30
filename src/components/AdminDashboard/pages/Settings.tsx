import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import IntegrationsSettings from '../settings/IntegrationsSettings';
import CompanySettings from '../settings/CompanySettings';
import { getSystemSettings, updateSystemSettings } from '../../../services/settings';
import type { SystemSettings } from '../../../types/settings';

export default function Settings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await getSystemSettings();
    setSettings(data);
    setLoading(false);
  };

  const handleSaveSettings = async (newSettings: SystemSettings) => {
    const success = await updateSystemSettings(newSettings);
    if (success) {
      setSettings(newSettings);
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (!settings) {
    return <div>Error loading settings</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>

      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <CompanySettings 
            settings={settings.company}
            onSave={async (companySettings) => {
              await handleSaveSettings({
                ...settings,
                company: companySettings
              });
            }}
          />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationsSettings 
            settings={settings.integrations}
            onSave={async (integrationSettings) => {
              await handleSaveSettings({
                ...settings,
                integrations: integrationSettings
              });
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}