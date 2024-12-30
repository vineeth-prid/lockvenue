import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
}

export function useVendorBankDetails() {
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBankDetails();
  }, []);

  const loadBankDetails = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: vendorProfile } = await supabase
      .from('vendor_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (vendorProfile) {
      const { data, error } = await supabase
        .from('vendor_bank_details')
        .select('*')
        .eq('vendor_id', vendorProfile.id)
        .single();

      if (!error && data) {
        setBankDetails({
          accountHolderName: data.account_holder_name,
          accountNumber: data.account_number,
          bankName: data.bank_name,
          branchName: data.branch_name,
          ifscCode: data.ifsc_code
        });
      }
    }
    setLoading(false);
  };

  const updateBankDetails = async (newDetails: BankDetails) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: vendorProfile } = await supabase
      .from('vendor_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!vendorProfile) return false;

    const { error } = await supabase
      .from('vendor_bank_details')
      .upsert({
        vendor_id: vendorProfile.id,
        account_holder_name: newDetails.accountHolderName,
        account_number: newDetails.accountNumber,
        bank_name: newDetails.bankName,
        branch_name: newDetails.branchName,
        ifsc_code: newDetails.ifscCode
      });

    if (!error) {
      setBankDetails(newDetails);
      return true;
    }
    return false;
  };

  return {
    bankDetails,
    updateBankDetails,
    loading
  };
}