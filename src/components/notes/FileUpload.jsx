/**
 * FileUpload Component
 * Drag-and-drop file upload with preview and progress simulation
 */

import { useState, useRef, useCallback } from 'react';
import { Badge } from '../common';

const FileUpload = ({
  accept = '.pdf,.png,.jpg,.jpeg',
  maxSize = 10 * 1024 * 1024, // 10MB
  onFileSelect,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  // Validate and process file
  const handleFile = (selectedFile) => {
    setError(null);

    // Check file type
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or image file (PNG, JPG)');
      return;
    }

    // Check file size
    if (selectedFile.size > maxSize) {
      setError(`File size must be less than ${formatFileSize(maxSize)}`);
      return;
    }

    setFile(selectedFile);

    // Generate preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    // Simulate upload
    simulateUpload(selectedFile);
  };

  // Simulate upload progress
  const simulateUpload = (selectedFile) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onFileSelect?.(selectedFile);
          return 100;
        }
        // Random progress increment for realistic feel
        return Math.min(prev + Math.random() * 15 + 5, 100);
      });
    }, 200);
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  // Clear selected file
  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setUploadProgress(0);
    setIsUploading(false);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file type icon
  const getFileIcon = () => {
    if (!file) return null;
    
    if (file.type === 'application/pdf') {
      return (
        <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      );
    }
    
    return (
      <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center overflow-hidden">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Dropzone */}
      {!file && (
        <div
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative
            border-2 border-dashed rounded-xl
            p-8 text-center cursor-pointer
            transition-all duration-[var(--transition-normal)]
            ${isDragging
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-[1.02]'
              : 'border-[var(--border-color)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-secondary)]'
            }
            ${error ? 'border-[var(--color-error)]' : ''}
          `}
        >
          {/* Upload Icon */}
          <div className={`
            w-16 h-16 mx-auto rounded-full
            flex items-center justify-center mb-4
            transition-colors
            ${isDragging
              ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
            }
          `}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-2">
            {isDragging ? 'Drop your file here' : 'Upload your notes'}
          </h3>
          
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Drag and drop your file here, or click to browse
          </p>

          <div className="flex items-center justify-center gap-2">
            <Badge variant="info" size="sm">PDF</Badge>
            <Badge variant="info" size="sm">PNG</Badge>
            <Badge variant="info" size="sm">JPG</Badge>
          </div>

          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Maximum file size: {formatFileSize(maxSize)}
          </p>

          {/* Hidden input */}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-error)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* File Preview */}
      {file && (
        <div className="bg-[var(--color-bg-card)] border border-[var(--border-color)] rounded-xl p-4">
          <div className="flex items-start gap-4">
            {getFileIcon()}
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-[var(--color-text-primary)] truncate">
                {file.name}
              </h4>
              <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                {formatFileSize(file.size)}
              </p>

              {/* Progress Bar */}
              {isUploading && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-1">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Success State */}
              {!isUploading && uploadProgress === 100 && (
                <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  File uploaded successfully
                </div>
              )}
            </div>

            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-red-50 rounded-lg transition-colors"
              title="Remove file"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mt-4 rounded-lg overflow-hidden border border-[var(--border-color)]">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 w-full object-contain bg-[var(--color-bg-secondary)]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
