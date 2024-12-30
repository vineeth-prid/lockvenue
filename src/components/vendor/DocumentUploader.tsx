import React, { useRef, useState } from 'react';
import { Upload, Check, AlertCircle, Loader } from 'lucide-react';

interface DocumentUploaderProps {
  document: {
    type: string;
    title: string;
    description: string;
    formats: string[];
    maxSize: number;
  };
  onUpload: (file: File) => void;
}

export default function DocumentUploader({ document, onUpload }: DocumentUploaderProps) {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > document.maxSize * 1024 * 1024) {
      setStatus('error');
      setErrorMessage(`File size must be less than ${document.maxSize}MB`);
      return;
    }

    // Validate file format
    const fileExtension = file.name.split('.').pop()?.toUpperCase();
    if (!document.formats.includes(fileExtension || '')) {
      setStatus('error');
      setErrorMessage(`File must be in ${document.formats.join(', ')} format`);
      return;
    }

    try {
      setStatus('uploading');
      await onUpload(file);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to upload file');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{document.description}</p>
          <p className="text-xs text-gray-500 mt-2">
            Accepted formats: {document.formats.join(', ')} • Max size: {document.maxSize}MB
          </p>
        </div>
        {status === 'success' && (
          <div className="flex items-center text-green-600">
            <Check className="w-5 h-5 mr-1" />
            <span className="text-sm">Verified</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={document.formats.map(f => `.${f.toLowerCase()}`).join(',')}
          className="hidden"
        />
        
        {status === 'error' && (
          <div className="flex items-center text-red-600 text-sm mb-3">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errorMessage}
          </div>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={status === 'uploading'}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed rounded-lg ${
            status === 'uploading'
              ? 'border-gray-300 bg-gray-50'
              : 'border-teal-300 hover:border-teal-400 bg-teal-50'
          }`}
        >
          {status === 'uploading' ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>{status === 'success' ? 'Replace Document' : 'Upload Document'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}