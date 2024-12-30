export default function AddVenueModal({ isOpen, onClose, onSuccess }: AddVenueModalProps) {
  // ... existing state code ...

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Add New Venue</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields with improved mobile spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ... existing form fields ... */}
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
              <div className="flex flex-col-reverse md:flex-row md:justify-end space-y-reverse space-y-2 md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 w-full md:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 w-full md:w-auto"
                >
                  Add Venue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}