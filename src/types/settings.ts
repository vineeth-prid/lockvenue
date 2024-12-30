export interface SmtpSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  secure: boolean;
}

export interface ExternalIntegrations {
  googleMaps: {
    apiKey: string;
    region: string;
  };
  razorpay: {
    keyId: string;
    keySecret: string;
    webhookSecret: string;
  };
  smtp: SmtpSettings;
}

export interface CompanySettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

export interface SystemSettings {
  company: CompanySettings;
  integrations: ExternalIntegrations;
}