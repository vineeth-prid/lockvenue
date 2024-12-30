import React, { useState, useEffect } from 'react';
import { Building2, Search, Filter } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import VendorStatusBadge from '../vendors/VendorStatusBadge';
import VendorDetailsModal from '../vendors/VendorDetailsModal';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    // First get all vendor profiles
    const { data: vendorProfiles, error: vendorError } = await supabase
      .from('vendor_profiles')
      .select('*');

    if (vendorError) {
      console.error('Error fetching vendors:', vendorError);
      setLoading(false);
      return;
    }

    // Then get user details for each vendor
    const vendorsWithDetails = await Promise.all(
      vendorProfiles.map(async (vendor) => {
        const { data: userData } = await supabase
          .from('auth.users')
          .select('email')
          .eq('id', vendor.user_id)
          .single();

        // Get venue count
        const { count } = await supabase
          .from('venues')
          .select('id', { count: 'exact' })
          .eq('vendor_id', vendor.id);

        return {
          ...vendor,
          user: userData,
          venues_count: count || 0
        };
      })
    );

    setVendors(vendorsWithDetails);
    setLoading(false);
  };

  return (
    <div>
      {/* Rest of the component remains the same */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading vendors...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor: any) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-teal-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {vendor.business_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vendor.user?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.contact_person}</div>
                    <div className="text-sm text-gray-500">{vendor.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vendor.venues_count} venues
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <VendorStatusBadge status={vendor.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedVendor(vendor)}
                      className="text-teal-600 hover:text-teal-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedVendor && (
        <VendorDetailsModal
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
          onStatusChange={fetchVendors}
        />
      )}
    </div>
  );
}