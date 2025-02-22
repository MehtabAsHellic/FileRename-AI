import React, { useState } from 'react';
import { FileItem, ConversionOptions } from '../types';
import { 
  File, CheckCircle, AlertCircle, Loader2, Download, Trash2, 
  PackageCheck, Archive, Eye, FileText, Edit2, Undo2, Save, X
} from 'lucide-react';
import { FileConversionOptions } from './ConversionOptions';
import { DocumentAnalyzer } from './DocumentAnalyzer';
import JSZip from 'jszip';
import toast from 'react-hot-toast';

interface FileListProps {
  files: FileItem[];
  onDownload: (file: FileItem) => void;
  onRemove: (fileId: string) => void;
  onPreview: (file: FileItem) => void;
  onConvert: (file: FileItem, options: ConversionOptions) => void;
  onRename: (fileId: string, newName: string) => void;
  onUndoRename: (fileId: string) => void;
}

export function FileList({ 
  files, 
  onDownload, 
  onRemove, 
  onPreview, 
  onConvert,
  onRename,
  onUndoRename 
}: FileListProps) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isZipping, setIsZipping] = useState(false);
  const [analyzingFile, setAnalyzingFile] = useState<FileItem | null>(null);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

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
      
      try {
        const chunkSize = 5;
        for (let i = 0; i < filesToDownload.length; i += chunkSize) {
          const chunk = filesToDownload.slice(i, i + chunkSize);
          
          await Promise.all(chunk.map(async (file) => {
            const fileToZip = file.convertedFile || file.file;
            if (fileToZip) {
              zip.file(file.newName || file.originalName, fileToZip);
            }
          }));

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
        toast.error('Failed to create ZIP file. Try downloading files individually.');
      } finally {
        setIsZipping(false);
      }
    } else {
      for (const file of filesToDownload) {
        await new Promise(resolve => setTimeout(resolve, 100));
        onDownload(file);
      }
      toast.success('Files downloaded successfully!');
    }
  };

  const handleAnalyzeDocument = (file: FileItem) => {
    if (file.status === 'completed' && file.file) {
      setAnalyzingFile(file);
    }
  };

  const handleStartEdit = (file: FileItem) => {
    setEditingFileId(file.id);
    setEditValue(file.newName || file.originalName);
  };

  const handleSaveEdit = (fileId: string) => {
    if (editValue.trim()) {
      onRename(fileId, editValue.trim());
      setEditingFileId(null);
      setEditValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingFileId(null);
    setEditValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, fileId: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(fileId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSelectAll}
              className="text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap"
            >
              {selectedFiles.size === files.length ? 'Deselect All' : 'Select All'}
            </button>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleBulkDownload(true)}
                disabled={selectedFiles.size === 0 || isZipping}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-white transition-colors duration-200 w-full sm:w-auto
                  ${selectedFiles.size === 0 || isZipping
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isZipping ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Archive className="w-4 h-4 mr-2" />
                )}
                <span className="whitespace-nowrap">Download as ZIP ({selectedCount})</span>
              </button>
              
              <button
                onClick={() => handleBulkDownload(false)}
                disabled={selectedFiles.size === 0}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-white transition-colors duration-200 w-full sm:w-auto
                  ${selectedFiles.size === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'}`}
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="whitespace-nowrap">Download Separately ({selectedCount})</span>
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 break-all">
                        {file.originalName}
                      </p>
                      {file.newName && editingFileId !== file.id ? (
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="text-gray-400 mr-2">→</span>
                          <span className="break-all">{file.newName}</span>
                          {file.status === 'completed' && (
                            <div className="ml-2 flex items-center space-x-2">
                              <button
                                onClick={() => handleStartEdit(file)}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                                title="Edit name"
                              >
                                <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-500" />
                              </button>
                              {file.history && file.history.length > 0 && (
                                <button
                                  onClick={() => onUndoRename(file.id)}
                                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                                  title="Undo rename"
                                >
                                  <Undo2 className="w-4 h-4 text-gray-500 hover:text-blue-500" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ) : editingFileId === file.id ? (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-gray-400 mr-2">→</span>
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, file.id)}
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(file.id)}
                            className="p-1 hover:bg-blue-100 rounded-lg transition-colors duration-150"
                            title="Save"
                          >
                            <Save className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                            title="Cancel"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      ) : null}
                      <FileConversionOptions
                        file={file}
                        onConvert={(options) => onConvert(file, options)}
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {file.status === 'uploading' && (
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
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
                          {(file.type === 'application/pdf' || 
                            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
                            <button
                              onClick={() => handleAnalyzeDocument(file)}
                              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-150 group"
                              title="Analyze document"
                            >
                              <FileText className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                            </button>
                          )}
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

      {analyzingFile && (
        <DocumentAnalyzer
          file={analyzingFile.file!}
          onClose={() => setAnalyzingFile(null)}
        />
      )}
    </div>
  );
}