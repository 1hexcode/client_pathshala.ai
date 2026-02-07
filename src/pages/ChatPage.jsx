import { useState, useRef, useMemo } from 'react';
import { Button } from '../components/common';

const API_BASE = 'http://127.0.0.1:8000';

/** Lightweight markdown → HTML for LLM output */
function renderMarkdown(text) {
  if (!text) return '';
  return text
    // Headers
    .replace(/^### (.+)$/gm, '<h4 class="font-semibold text-foreground mt-4 mb-2 text-base">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="font-bold text-foreground mt-5 mb-2 text-lg">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 class="font-bold text-foreground mt-6 mb-3 text-xl">$1</h2>')
    // Bold + Italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-semibold"><em>$1</em></strong>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Bullet points
    .replace(/^[\-\*] (.+)$/gm, '<li class="ml-4 mb-1 list-disc list-inside">$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal list-inside">$1</li>')
    // Line breaks (double newline = paragraph, single = br)
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br/>');
}

export function SummaryPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [platform, setPlatform] = useState('groq');
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }
    setUploadedFile(file);
    setResult(null);
    setError(null);
    setPreview(null);
  };

  const processFile = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setError(null);
    setProcessingStep(0);

    try {
      // Step indicators
      setProcessingStep(1); // Uploading

      const formData = new FormData();
      formData.append('file', uploadedFile);

      setProcessingStep(2); // Processing

      const response = await fetch(
        `${API_BASE}/api/v1/pdf/summarize?platform=${platform}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.detail || `Server error (${response.status})`);
      }

      setProcessingStep(3); // Done

      const data = await response.json();

      setResult({
        summary: data.data.summary,
        model: data.data.model,
        platform: data.data.platform,
        filename: data.data.filename,
        textLength: data.data.original_text_length,
        wordCount: data.data.word_count,
        chunksProcessed: data.data.chunks_processed,
      });
    } catch (err) {
      console.error('Summarization failed:', err);
      setError(err.message || 'Something went wrong. Check if the server is running.');
    } finally {
      setIsProcessing(false);
      setProcessingStep(0);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copySummary = async () => {
    if (!result?.summary) return;
    try {
      await navigator.clipboard.writeText(result.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = result.summary;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const stepLabels = [
    'Uploading PDF',
    'Extracting text & generating summary',
    'Done!',
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-background to-primary/5 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 shadow-lg shadow-primary/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            PDF Summarizer
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Upload a PDF and get an AI-powered summary instantly. Choose between Groq and OpenRouter platforms.
          </p>
        </div>

        {!result ? (
          <>
            {/* Platform Selector */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-sm text-muted">Platform:</span>
              <div className="inline-flex rounded-xl bg-surface border border-border p-1">
                {[
                  { id: 'groq', label: 'Groq', icon: '⚡' },
                  { id: 'openrouter', label: 'OpenRouter', icon: '🔀' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${platform === p.id
                        ? 'bg-primary text-black shadow-md shadow-primary/25'
                        : 'text-muted hover:text-foreground hover:bg-surface-hover'
                      }
                    `}
                  >
                    <span className="mr-1.5">{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300
                ${dragActive
                  ? 'border-primary bg-primary/5 scale-[1.02]'
                  : uploadedFile
                    ? 'border-success bg-success/5'
                    : 'border-border hover:border-primary/50 hover:bg-surface'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInput}
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {!uploadedFile ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Drop your PDF here
                  </h3>
                  <p className="text-muted mb-4">
                    or click to browse files
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                      PDF files only
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-20 h-24 bg-error/10 rounded-lg flex flex-col items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-error" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span className="text-xs font-medium text-error mt-1">PDF</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-foreground">{uploadedFile.name}</span>
                  </div>
                  <p className="text-sm text-muted">
                    {(uploadedFile.size / 1024).toFixed(1)} KB • Ready to summarize
                  </p>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-error flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-error">Summarization failed</p>
                    <p className="text-sm text-error/80 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {uploadedFile && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button variant="ghost" onClick={resetUpload}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={processFile}
                  disabled={isProcessing}
                  className="min-w-[180px]"
                >
                  {isProcessing ? (
                    <>
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Summarize PDF
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Processing Animation */}
            {isProcessing && (
              <div className="mt-8 p-6 bg-surface rounded-2xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">AI is analyzing your PDF...</h4>
                    <div className="flex items-center gap-3 text-sm text-muted">
                      {stepLabels.map((label, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${processingStep > i + 1
                            ? 'bg-success'
                            : processingStep === i + 1
                              ? 'bg-primary animate-pulse'
                              : 'bg-muted/30'
                            }`}></span>
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tips Section */}
            {!uploadedFile && (
              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    ),
                    title: 'Powered by AI',
                    desc: 'Uses Groq or OpenRouter to generate intelligent summaries',
                  },
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    ),
                    title: 'PDF Support',
                    desc: 'Upload any PDF document for text extraction and summarization',
                  },
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    ),
                    title: 'Multi-Platform',
                    desc: 'Choose between Groq and OpenRouter for the best results',
                  },
                ].map((tip, index) => (
                  <div key={index} className="p-4 bg-surface rounded-xl border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {tip.icon}
                      </svg>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted">{tip.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{result.filename}</h2>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {result.platform} • {result.model}
                    </span>
                    <span>•</span>
                    <span>{result.wordCount.toLocaleString()} words extracted</span>
                    {result.chunksProcessed > 1 && (
                      <>
                        <span>•</span>
                        <span>{result.chunksProcessed} chunks</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={resetUpload}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload New
              </Button>
            </div>

            {/* Summary Card */}
            <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="font-semibold text-foreground">AI Summary</h3>
              </div>
              <div
                className="text-foreground leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(result.summary) }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button variant="outline" onClick={copySummary}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {copied ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  )}
                </svg>
                {copied ? 'Copied!' : 'Copy Summary'}
              </Button>
              <Button variant="primary" onClick={resetUpload}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Summarize Another
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
