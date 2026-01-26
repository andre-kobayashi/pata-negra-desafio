import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormInput = ({ label, value, onChange, placeholder, error, required, type = 'text', icon }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300">
        {label}
        {required && <span className="text-copper ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-black/50 border ${
            error ? 'border-red-500' : 'border-gray-700'
          } rounded-xl px-4 ${icon ? 'pl-12' : ''} py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent transition-all`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default FormInput;