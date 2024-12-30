import React, { useState } from 'react';
import { X, Building2, MapPin, Phone, Mail, FileText, DollarSign } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import VendorStatusBadge from './VendorStatusBadge';
import VendorDocumentList from './VendorDocumentList';
import CommissionSettings from './CommissionSettings';

interface VendorDetailsModalProps {
  vendor: any;
  onClose: () => void;
  onStatusChange: () => void;
}

export default function VendorDetailsModal({ vendor, onClose, onStatusChange }: VendorDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('vendor_profiles')
        .update({ status: newStatus })
        .eq('id', vendor.id);

      if (error) throw error;
      onStatusChange();
    } catch (error) {
      console.error('Error updating vendor status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{vendor.business_name}</h2>
              <VendorStatusBadge status={vendor.status} />
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('commission')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'commission'
                ? 'border-b-2 border-teal-600 text-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Commission
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-5 h-5 text-gray-400 mr-2" />
                      {vendor.users.email}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      {vendor.phone}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Business Address</h3>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p>{vendor.address}</p>
                      <p>{vendor.city}, {vendor.state} {vendor.postal_code}</p>
                      <p>{vendor.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Actions</h3>
                <div className="flex space-x-3">
                  {vendor.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange('active')}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      Approve Vendor
                    </button>
                  )}
                  {vendor.status === 'active' && (
                    <button
                      onClick={() => handleStatusChange('suspended')}
                      disabled={loading}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      Suspend Vendor
                    </button>
                  )}
                  {vendor.status === 'suspended' && (
                    <button
                      onClick={() => handleStatusChange('active')}
                      disabled={loading}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                    >
                      Reactivate Vendor
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <VendorDocumentList vendorId={vendor.id} />
          )}

          {activeTab === 'commission' && (
            <CommissionSettings vendorId={vendor.id} />
          )}
        </div>
      </div>
    </div>
  );
}