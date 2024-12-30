import React, { useState, useEffect } from 'react';
import { FileText, Check, X, AlertCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface VendorDocumentListProps {
  vendorId: string;
}

export default function VendorDocumentList({ vendorId }: VendorDocumentListProps) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, [vendorId]);

  const loadDocuments = async () => {
    const { data, error } = await supabase
      .from('vendor_documents')
      .select('*')
      .eq('vendor_id', vendorId);

    if (!error && data) {
      setDocuments(data);
    }
    setLoading(false);
  };

  const handleVerification = async (documentId: string, status: string) => {
    const { error } = await supabase
      .from('vendor_documents')
      .update({
        verification_status: status,
        verified_at: status === 'verified' ? new Date().toISOString() : null
      })
      .eq('id', documentId);

    if (!error) {
      loadDocuments();
    }
  };

  if (loading) return <div>Loading documents...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Submitted Documents</h3>
      <div className="space-y-4">
        {documents.map((doc: any) => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{doc.document_type}</p>
                <p className="text-sm text-gray-500">
                  Uploaded on {new Date(doc.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={doc.document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                View Document
              </a>
              {doc.verification_status === 'pending' && (
                <>
                  <button
                    onClick={() => handleVerification(doc.id, 'verified')}
                    className="p-1 text-green-600 hover:text-green-700"
                    title="Verify"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleVerification(doc.id, 'rejected')}
                    className="p-1 text-red-600 hover:text-red-700"
                    title="Reject"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
              {doc.verification_status === 'verified' && (
                <span className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-1" />
                  Verified
                </span>
              )}
              {doc.verification_status === 'rejected' && (
                <span className="flex items-center text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Rejected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}