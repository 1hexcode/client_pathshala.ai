import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Select, Badge } from '../components/common';
import { FileUpload } from '../components/notes';
import { colleges, getProgramsByCollege, getSubjectsByProgram, years, semesters } from '../data/academics';

export function UploadPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    file: null,
    title: '',
    description: '',
    collegeId: '',
    programId: '',
    yearId: '',
    semesterId: '',
    subjectId: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  const availablePrograms = formData.collegeId ? getProgramsByCollege(formData.collegeId) : [];
  const availableSubjects = formData.programId ? getSubjectsByProgram(formData.programId) : [];
  const availableSemesters = formData.yearId 
    ? semesters.filter(s => s.yearId === formData.yearId)
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Reset dependent fields
      if (name === 'collegeId') {
        updated.programId = '';
        updated.subjectId = '';
      }
      if (name === 'programId') {
        updated.subjectId = '';
      }
      if (name === 'yearId') {
        updated.semesterId = '';
      }
      return updated;
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileSelect = (file) => {
    setFormData(prev => ({ ...prev, file }));
    // Auto-fill title from filename
    if (!formData.title && file) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      setFormData(prev => ({ ...prev, title: nameWithoutExt }));
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.file) {
      newErrors.file = 'Please select a file to upload';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.collegeId) newErrors.collegeId = 'Required';
    if (!formData.programId) newErrors.programId = 'Required';
    if (!formData.subjectId) newErrors.subjectId = 'Required';
    if (!formData.yearId) newErrors.yearId = 'Required';
    if (!formData.semesterId) newErrors.semesterId = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    navigate('/dashboard', { state: { uploadSuccess: true } });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Upload Notes</h1>
        <p className="text-muted">Share your study materials with the community</p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-primary text-white' : 'bg-border text-muted'
          }`}>
            {step > 1 ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : '1'}
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">File & Details</span>
        </div>
        <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-primary text-white' : 'bg-border text-muted'
          }`}>
            2
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">Classification</span>
        </div>
      </div>

      <Card className="p-6">
        {isUploading ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">
              {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
            </h2>
            <p className="text-muted mb-6">Please wait while we process your file</p>
            
            <div className="max-w-xs mx-auto">
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted mt-2">{uploadProgress}%</p>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="space-y-6">
            <FileUpload
              file={formData.file}
              onFileSelect={handleFileSelect}
              error={errors.file}
            />

            <Input
              label="Title"
              name="title"
              placeholder="e.g., Data Structures Complete Notes"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Describe what's covered in these notes..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Tags <span className="text-muted font-normal">(up to 5)</span>
              </label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="neutral" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:text-foreground">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Badge>
                ))}
              </div>
              {formData.tags.length < 5 && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={addTag}>Add</Button>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" onClick={handleNext}>
                Continue
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="College"
                name="collegeId"
                value={formData.collegeId}
                onChange={handleChange}
                error={errors.collegeId}
                options={[
                  { value: '', label: 'Select college' },
                  ...colleges.map(c => ({ value: c.id, label: c.name }))
                ]}
              />

              <Select
                label="Program"
                name="programId"
                value={formData.programId}
                onChange={handleChange}
                error={errors.programId}
                disabled={!formData.collegeId}
                options={[
                  { value: '', label: formData.collegeId ? 'Select program' : 'Select college first' },
                  ...availablePrograms.map(p => ({ value: p.id, label: p.name }))
                ]}
              />
            </div>

            <Select
              label="Subject"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              error={errors.subjectId}
              disabled={!formData.programId}
              options={[
                { value: '', label: formData.programId ? 'Select subject' : 'Select program first' },
                ...availableSubjects.map(s => ({ value: s.id, label: `${s.code} - ${s.name}` }))
              ]}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="Year"
                name="yearId"
                value={formData.yearId}
                onChange={handleChange}
                error={errors.yearId}
                options={[
                  { value: '', label: 'Select year' },
                  ...years.map(y => ({ value: y.id, label: y.name }))
                ]}
              />

              <Select
                label="Semester"
                name="semesterId"
                value={formData.semesterId}
                onChange={handleChange}
                error={errors.semesterId}
                disabled={!formData.yearId}
                options={[
                  { value: '', label: formData.yearId ? 'Select semester' : 'Select year first' },
                  ...availableSemesters.map(s => ({ value: s.id, label: s.name }))
                ]}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleSubmit}>
                Upload Notes
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Guidelines */}
      {!isUploading && (
        <Card className="mt-6 p-5 bg-surface">
          <h3 className="font-medium text-foreground mb-3">Upload Guidelines</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Only upload content you have the right to share
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Supported formats: PDF, DOC, DOCX, PPT, PPTX (max 50MB)
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Use descriptive titles and accurate classifications
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Notes will be reviewed before publishing
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
}
