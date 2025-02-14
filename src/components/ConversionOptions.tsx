import React from 'react';
import { FileItem, ConversionOptions } from '../types';
import { getSupportedConversions } from '../utils/fileConverter';
import { Settings, FileType } from 'lucide-react';

interface FileConversionOptionsProps {
  file: FileItem;
  onConvert: (options: ConversionOptions) => void;
}

export function FileConversionOptions({ file, onConvert }: FileConversionOptionsProps) {
  const supportedFormats = getSupportedConversions(file.type);
  
  if (supportedFormats.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 flex items-center space-x-2">
      <FileType className="w-4 h-4 text-gray-400" />
      <select
        onChange={(e) => onConvert({ targetFormat: e.target.value })}
        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Convert to...</option>
        {supportedFormats.map((format) => (
          <option key={format} value={format}>
            Convert to {format.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}