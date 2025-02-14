import React, { useState } from 'react';
import { FileItem, ConversionOptions } from '../types';
import { File, CheckCircle, AlertCircle, Loader2, Download, Trash2, PackageCheck, Archive, Eye } from 'lucide-react';
import { FileConversionOptions } from './ConversionOptions';
import JSZip from 'jszip';
import toast from 'react-hot-toast';

interface FileListProps {
  files: FileItem[];
  onDownload: (file: FileItem) => void;
  onRemove: (fileId: string) => void;
  onPreview: (file: FileItem) => void;
  onConvert: (file: FileItem, options: ConversionOptions) => void;
}

export function FileList({ files, onDownload, onRemove, onPreview, onConvert }: FileListProps) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isZipping, setIsZipping] = useState(false);

  if (files.length === 0) {
    return null;
  }

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map(f => f.id)));
    }
  };

  const handleBulkDownload = async (asZip: boolean = true) => {
    const filesToDownload = files.filter(f => 
      selectedFiles.has(f.id) && f.status === 'completed'
    );

    if (filesToDownload.length === 0) {
      toast.error('Please select files to download');
      return;
    }

    if (asZip) {
      setIsZipping(true);
      const zip = new JSZip();
      const chunkSize = 2;
      
      try {
        // Process files in smaller chunks to prevent memory issues
        for (let i = 0; i < filesToDownload.length; i += chunkSize) {
          const chunk = filesToDownload.slice(i, i + chunkSize);
          await Promise.all(chunk.map(async (file) => {
            const fileToZip = file.convertedFile || file.file;
            if (fileToZip) {
              const arrayBuffer = await fileToZip.arrayBuffer();
              zip.file(file.newName || file.originalName, arrayBuffer);
            }
          }));
          
          // Add a small delay between chunks to prevent browser from freezing
          if (i + chunkSize < filesToDownload.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
        
        const content = await zip.generateAsync({
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
        });
        
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `renamed_files_${new Date().toISOString().split('T')[0]}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Files downloaded successfully!');
      } catch (error) {
        console.error('Error generating zip:', error);
        toast.error('Failed to create ZIP file');
      } finally {
        setIsZipping(false);
      }
    } else {
      // Download files individually
      filesToDownload.forEach(file => {
        onDownload(file);
      });
      toast.success('Files downloaded successfully!');
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;
  const selectedCount = selectedFiles.size;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Files ({files.length})</h2>
          <span className="text-sm text-gray-500">
            {completedCount} completed
          </span>
        </div>
        
        {files.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSelectAll}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {selectedFiles.size === files.length ? 'Deselect All' : 'Select All'}
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkDownload(true)}
                disabled={selectedFiles.size === 0 || isZipping}
                className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors duration-200
                  ${selectedFiles.size === 0 || isZipping
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isZipping ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Archive className="w-4 h-4 mr-2" />
                )}
                Download as ZIP ({selectedCount})
              </button>
              
              <button
                onClick={() => handleBulkDownload(false)}
                disabled={selectedFiles.size === 0}
                className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors duration-200
                  ${selectedFiles.size === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'}`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Separately ({selectedCount})
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {files.map((file) => (
            <div
              key={file.id}
              className={`p-4 transition-colors duration-150
                ${selectedFiles.has(file.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(file.id)}
                    onChange={() => handleSelectFile(file.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex-shrink-0">
                  <File className="w-6 h-6 text-gray-400" />
                </div>
                
                <div className="flex-1 min-w-0 ml-4">
                  <div className="flex justify-between items-start">
                    <div className="truncate flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.originalName}
                      </p>
                      {file.newName && (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="text-gray-400 mr-2">→</span>
                          <span className="truncate">{file.newName}</span>
                        </div>
                      )}
                      <FileConversionOptions
                        file={file}
                        onConvert={(options) => onConvert(file, options)}
                      />
                    </div>
                    <div className="ml-4 flex items-center space-x-3">
                      {file.status === 'uploading' && (
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-150"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500 w-12">{file.progress}%</span>
                        </div>
                      )}
                      {file.status === 'processing' && (
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                      )}
                      {file.status === 'completed' && (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <button
                            onClick={() => onPreview(file)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-150 group"
                            title="Preview file"
                          >
                            <Eye className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                          </button>
                          <button
                            onClick={() => onDownload(file)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-150 group"
                            title="Download file"
                          >
                            <Download className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                          </button>
                        </>
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                      <button
                        onClick={() => onRemove(file.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-150 group"
                        title="Remove file"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                  {file.error && (
                    <p className="mt-1 text-sm text-red-600">{file.error}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}