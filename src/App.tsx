import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FileUploader } from './components/FileUploader';
import { FileList } from './components/FileList';
import { PatternInput } from './components/PatternInput';
import { Hero } from './components/Hero';
import { Header } from './components/Header';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { FilePreview } from './components/FilePreview';
import { FileItem, RenamePattern, ConversionOptions } from './types';
import { Loader2, ArrowUp } from 'lucide-react';
import { analyzePDF } from './utils/fileAnalyzer';
import { initializeModel } from './utils/fileAnalyzer';
import { convertFile } from './utils/fileConverter';
import toast from 'react-hot-toast';

function App() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [pattern, setPattern] = useState<RenamePattern>({ type: 'ai' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [uploadingCount, setUploadingCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    initializeModel().then(() => {
      setIsModelLoading(false);
    });
  }, []);

  // Track number of files currently uploading
  useEffect(() => {
    const uploading = files.filter(f => f.status === 'uploading').length;
    setUploadingCount(uploading);
  }, [files]);

  const handleFilesSelected = useCallback(async (selectedFiles: File[]) => {
    const newFiles: FileItem[] = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      originalName: file.name,
      newName: null,
      status: 'uploading',
      progress: 0,
      type: file.type || 'application/octet-stream',
      size: file.size,
      file: file,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setIsProcessing(true);

    try {
      for (const fileItem of newFiles) {
        try {
          const uploadInterval = setInterval(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileItem.id
                  ? { ...f, progress: Math.min(f.progress + 10, 100) }
                  : f
              )
            );
          }, 200);

          await new Promise((resolve) => setTimeout(resolve, 2000));
          clearInterval(uploadInterval);

          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? { ...f, status: 'processing', progress: 100 }
                : f
            )
          );

          const newName = await generateNewName(fileItem, pattern);

          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? { ...f, status: 'completed', newName }
                : f
            )
          );
        } catch (error) {
          console.error(`Error processing file ${fileItem.originalName}:`, error);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? { ...f, status: 'error', error: 'Failed to process file' }
                : f
            )
          );
          toast.error(`Failed to process ${fileItem.originalName}`);
        }
      }

      toast.success('All files processed successfully!');
    } catch (error) {
      console.error('Error processing files:', error);
      toast.error('An error occurred while processing files');
    } finally {
      setIsProcessing(false);
    }
  }, [pattern]);

  const handlePreviewFile = useCallback((file: FileItem) => {
    // Only allow preview if file is not uploading
    if (file.status !== 'uploading') {
      setPreviewFile(file);
    }
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewFile(null);
  }, []);

  const handleConvertFile = async (file: FileItem, options: ConversionOptions) => {
    try {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, status: 'processing' }
            : f
        )
      );

      const convertedFile = await convertFile(file.file!, options);
      
      if (!convertedFile) {
        throw new Error('Conversion failed');
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: 'completed',
                convertedFile,
                convertedType: convertedFile.type,
                newName: convertedFile.name
              }
            : f
        )
      );

      toast.success(`Successfully converted ${file.originalName}`);
    } catch (error) {
      console.error('Conversion error:', error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, status: 'error', error: 'Conversion failed' }
            : f
        )
      );
      toast.error(`Failed to convert ${file.originalName}`);
    }
  };

  const generateNewName = async (file: FileItem, pattern: RenamePattern): Promise<string> => {
    if (pattern.type === 'ai') {
      if (file.type === 'application/pdf') {
        return await analyzePDF(file.file as File);
      }
      
      const prefix = file.type.startsWith('image/')
        ? 'Photo'
        : file.type.startsWith('video/')
        ? 'Video'
        : 'Document';
      const date = new Date().toISOString().split('T')[0];
      return `${prefix}_${date}_${Math.floor(Math.random() * 1000)}${getExtension(file.originalName)}`;
    } else {
      let newName = pattern.pattern || '{original}';
      const date = new Date().toISOString().split('T')[0];
      const type = file.type.split('/')[0];
      
      newName = newName
        .replace('{date}', date)
        .replace('{type}', type)
        .replace('{original}', file.originalName.replace(/\.[^/.]+$/, ""))
        .replace('{counter}', Math.floor(Math.random() * 1000).toString());
        
      return newName + getExtension(file.originalName);
    }
  };

  const getExtension = (filename: string): string => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 1);
  };

  const handleDownload = (file: FileItem) => {
    const fileToDownload = file.convertedFile || file.file;
    if (fileToDownload) {
      const url = URL.createObjectURL(fileToDownload);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.newName || file.originalName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${file.newName || file.originalName}`);
    }
  };

  const handleRemove = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleApplyPattern = async () => {
    setIsProcessing(true);
    
    const updatedFiles = await Promise.all(
      files.map(async (file) => ({
        ...file,
        status: 'completed' as const,
        newName: await generateNewName(file, pattern),
      }))
    );
    
    setFiles(updatedFiles);
    setIsProcessing(false);
  };

  if (isModelLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
          <p className="text-gray-600">Loading AI model...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onStartRenaming={() => scrollToSection('upload')} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8" id="upload">
          <PatternInput
            pattern={pattern}
            onChange={setPattern}
            onApply={handleApplyPattern}
            disabled={isProcessing}
          />
          
          <FileUploader
            onFilesSelected={handleFilesSelected}
            disabled={isProcessing}
          />
          
          <FileList
            files={files}
            onDownload={handleDownload}
            onRemove={handleRemove}
            onPreview={handlePreviewFile}
            onConvert={handleConvertFile}
          />
        </div>
      </main>

      <Testimonials />
      <Footer />

      {previewFile && (
        <FilePreview
          key={previewFile.id}
          file={previewFile}
          onClose={handleClosePreview}
        />
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;