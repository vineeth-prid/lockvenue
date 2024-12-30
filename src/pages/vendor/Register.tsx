import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Building2, Upload, CreditCard } from 'lucide-react';

const BUSINESS_TYPES = [
  'Individual',
  'Private Limited Company',
  'Limited Liability Partnership',
  'Partnership Firm',
  'Sole Proprietorship'
];

export default function VendorRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    taxId: '',
    contactPerson: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    documents: {
      businessProof: null,
      identityProof: null,
      addressProof: null
    },
    bankDetails: {
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      branchName: '',
      ifscCode: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create vendor profile
      const { data: vendorProfile, error: profileError } = await supabase
        .from('vendor_profiles')
        .insert([{
          user_id: user.id,
          business_name: formData.businessName,
          business_type: formData.businessType,
          tax_id: formData.taxId,
          contact_person: formData.contactPerson,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postalCode,
          country: formData.country
        }])
        .select()
        .single();

      if (profileError) throw profileError;

      // Create bank details
      await supabase
        .from('vendor_bank_details')
        .insert([{
          vendor_id: vendorProfile.id,
          account_holder_name: formData.bankDetails.accountHolderName,
          account_number: formData.bankDetails.accountNumber,
          bank_name: formData.bankDetails.bankName,
          branch_name: formData.bankDetails.branchName,
          ifsc_code: formData.bankDetails.ifscCode
        }]);

      navigate('/vendor/dashboard');
    } catch (error) {
      console.error('Error registering vendor:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Business Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Business Type</option>
                  {BUSINESS_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              {/* Add other business fields */}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Document Upload</h2>
            <div className="space-y-6">
              {/* Document upload fields */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Drag and drop your documents here, or click to browse
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Bank Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Bank details fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={formData.bankDetails.accountHolderName}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankDetails: { ...formData.bankDetails, accountHolderName: e.target.value }
                  })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              {/* Add other bank fields */}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <Building2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Become a Vendor</h1>
            <p className="text-gray-600 mt-2">List your venues and start earning</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between relative">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${
                    stepNumber <= step ? 'text-teal-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    stepNumber <= step ? 'bg-teal-600 text-white' : 'bg-gray-200'
                  }`}>
                    {stepNumber}
                  </div>
                  <span className="ml-2 font-medium">
                    {stepNumber === 1 ? 'Business Info' :
                     stepNumber === 2 ? 'Documents' : 'Bank Details'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-teal-600 hover:text-teal-700"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}