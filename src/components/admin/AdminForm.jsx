/**
 * AdminForm Component
 * Reusable form for creating academic entities (colleges, programs, subjects, etc.)
 */

import { useState } from 'react';
import { Button, Input, Select, Card } from '../common';
import { colleges, programs, years, semesters } from '../../data/academics';

// Form configurations for different entity types
const formConfigs = {
  college: {
    title: 'Create New College',
    description: 'Add a new college to the academic hierarchy',
    fields: [
      { name: 'name', label: 'College Name', type: 'text', placeholder: 'e.g., College of Engineering', required: true },
      { name: 'code', label: 'College Code', type: 'text', placeholder: 'e.g., COE', required: true },
      { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Brief description of the college' }
    ]
  },
  program: {
    title: 'Create New Program',
    description: 'Add a new program under a college',
    fields: [
      { name: 'collegeId', label: 'College', type: 'select', options: colleges, required: true },
      { name: 'name', label: 'Program Name', type: 'text', placeholder: 'e.g., Computer Science & Engineering', required: true },
      { name: 'code', label: 'Program Code', type: 'text', placeholder: 'e.g., CSE', required: true },
      { name: 'duration', label: 'Duration (years)', type: 'number', placeholder: '4', required: true },
      { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Brief description of the program' }
    ]
  },
  year: {
    title: 'Create New Year',
    description: 'Add a new academic year',
    fields: [
      { name: 'name', label: 'Year Name', type: 'text', placeholder: 'e.g., First Year', required: true },
      { name: 'number', label: 'Year Number', type: 'number', placeholder: '1', required: true }
    ]
  },
  semester: {
    title: 'Create New Semester',
    description: 'Add a new semester under a year',
    fields: [
      { name: 'yearId', label: 'Year', type: 'select', options: years, required: true },
      { name: 'name', label: 'Semester Name', type: 'text', placeholder: 'e.g., Fall Semester', required: true },
      { name: 'number', label: 'Semester Number', type: 'number', placeholder: '1', required: true }
    ]
  },
  subject: {
    title: 'Create New Subject',
    description: 'Add a new subject to a program and semester',
    fields: [
      { name: 'programId', label: 'Program', type: 'select', options: programs, required: true },
      { name: 'semesterId', label: 'Semester', type: 'select', options: semesters, required: true },
      { name: 'name', label: 'Subject Name', type: 'text', placeholder: 'e.g., Data Structures', required: true },
      { name: 'code', label: 'Subject Code', type: 'text', placeholder: 'e.g., CS201', required: true },
      { name: 'credits', label: 'Credits', type: 'number', placeholder: '3', required: true },
      { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Brief description of the subject' }
    ]
  }
};

const AdminForm = ({
  type = 'college',
  onSubmit,
  onCancel,
  className = ''
}) => {
  const config = formConfigs[type];
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle field change
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    
    config.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Call onSubmit callback
    onSubmit?.({
      type,
      data: formData
    });
    
    setIsSubmitting(false);
    setSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setFormData({});
      setSuccess(false);
    }, 2000);
  };

  // Render field based on type
  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <Select
            key={field.name}
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={errors[field.name]}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        );
      
      case 'textarea':
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
              {field.label}
              {field.required && <span className="text-[var(--color-error)] ml-1">*</span>}
            </label>
            <textarea
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className={`
                w-full px-3 py-2
                bg-[var(--color-bg-primary)]
                border rounded-[var(--border-radius-sm)]
                text-[var(--color-text-primary)]
                placeholder:text-[var(--color-text-muted)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]
                transition-all duration-[var(--transition-fast)]
                resize-none
                ${errors[field.name] ? 'border-[var(--color-error)]' : 'border-[var(--border-color)]'}
              `}
            />
            {errors[field.name] && (
              <p className="mt-1 text-xs text-[var(--color-error)]">{errors[field.name]}</p>
            )}
          </div>
        );
      
      case 'number':
        return (
          <Input
            key={field.name}
            type="number"
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            error={errors[field.name]}
            required={field.required}
            min={1}
          />
        );
      
      default:
        return (
          <Input
            key={field.name}
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            error={errors[field.name]}
            required={field.required}
          />
        );
    }
  };

  return (
    <Card className={className}>
      <Card.Header>
        <Card.Title>{config.title}</Card.Title>
        <Card.Description>{config.description}</Card.Description>
      </Card.Header>
      
      <Card.Body>
        {success ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Created Successfully!
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              The {type} has been added to the system.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {config.fields.map(renderField)}
          </form>
        )}
      </Card.Body>
      
      {!success && (
        <Card.Footer className="flex justify-end gap-3">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isSubmitting}
          >
            Create {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default AdminForm;
