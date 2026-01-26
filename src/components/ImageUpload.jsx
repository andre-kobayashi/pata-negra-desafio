import React, { useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

const ImageUpload = ({ label, onChange, error, required }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        onChange(null);
        setPreview(null);
        setFileName('');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        onChange(null);
        setPreview(null);
        setFileName('');
        return;
      }

      setFileName(file.name);
      onChange(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName('');
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300">
        {label}
        {required && <span className="text-copper ml-1">*</span>}
      </label>

      {!preview ? (
        <label className={`block w-full border-2 border-dashed ${
          error ? 'border-red-500' : 'border-gray-700'
        } rounded-xl p-8 text-center cursor-pointer hover:border-copper transition-colors bg-black/30`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400 mb-2">Clique para fazer upload</p>
          <p className="text-sm text-gray-500">JPG ou PNG (máx. 5MB)</p>
        </label>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="mt-2 text-sm text-gray-400 truncate">{fileName}</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default ImageUpload;