import React, { useState } from 'react';
import { Save, CreditCard } from 'lucide-react';
import { useVendorBankDetails } from '../../../hooks/useVendorBankDetails';

export default function BankDetails() {
  const { bankDetails, updateBankDetails, loading } = useVendorBankDetails();
  const [formData, setFormData] = useState(bankDetails || {
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBankDetails(formData);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              value={formData.accountHolderName}
              onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          {/* Add other bank fields */}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Bank Details
        </button>
      </div>
    </form>
  );
}