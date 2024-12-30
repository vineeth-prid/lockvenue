import React from 'react';
import { FileText, Upload, Check, AlertCircle, RefreshCw } from 'lucide-react';
import DocumentUploader from '../../../components/vendor/DocumentUploader';

const REQUIRED_DOCUMENTS = [
  {
    type: 'business_proof',
    title: 'Business Registration',
    description: 'Valid business registration certificate or license',
    formats: ['PDF', 'JPG', 'PNG'],
    maxSize: 5 // MB
  },
  {
    type: 'tax_document',
    title: 'Tax Document',
    description: 'GST registration or tax identification document',
    formats: ['PDF'],
    maxSize: 2
  },
  {
    type: 'identity_proof',
    title: 'Identity Proof',
    description: 'Government issued ID of the business owner',
    formats: ['PDF', 'JPG', 'PNG'],
    maxSize: 3
  }
];

export default function VendorDocuments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
        <button className="text-teal-600 hover:text-teal-700 font-medium">
          View Requirements
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <DocumentUploader
            key={doc.type}
            document={doc}
            onUpload={(file) => {
              console.log('Uploading:', file);
            }}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Status</h3>
        <div className="flex items-center space-x-2 text-green-600">
          <Check className="w-5 h-5" />
          <span>All required documents have been submitted</span>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Your documents are currently under review. This process typically takes 1-2 business days.
        </div>
      </div>
    </div>
  );
}