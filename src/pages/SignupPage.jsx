import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Select } from '../components/common';
import { colleges, getProgramsByCollege } from '../data/academics';

export function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    collegeId: '',
    programId: '',
    currentSemester: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const programs = formData.collegeId ? getProgramsByCollege(formData.collegeId) : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Reset program when college changes
      if (name === 'collegeId') {
        updated.programId = '';
      }
      return updated;
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.collegeId) {
      newErrors.collegeId = 'Please select your college';
    }
    if (!formData.programId) {
      newErrors.programId = 'Please select your program';
    }
    if (!formData.currentSemester) {
      newErrors.currentSemester = 'Please select your semester';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // Navigate to dashboard on success
    navigate('/dashboard');
  };

  return (
    <div>
      {/* Mobile logo */}
      <div className="lg:hidden mb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xl font-display font-bold text-foreground">PathshalaAI</span>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">Create your account</h1>
        <p className="text-muted">
          {step === 1 ? 'Start your academic journey today' : 'Tell us about your studies'}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-border'}`}></div>
        <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
      </div>

      <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
        {step === 1 ? (
          <div className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText="Must be at least 8 characters"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <Button type="submit" variant="primary" className="w-full" size="lg">
              Continue
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <Select
              label="College"
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              error={errors.collegeId}
              options={[
                { value: '', label: 'Select your college' },
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
                { value: '', label: formData.collegeId ? 'Select your program' : 'Select college first' },
                ...programs.map(p => ({ value: p.id, label: p.name }))
              ]}
            />

            <Select
              label="Current Semester"
              name="currentSemester"
              value={formData.currentSemester}
              onChange={handleChange}
              error={errors.currentSemester}
              options={[
                { value: '', label: 'Select your semester' },
                { value: '1', label: '1st Semester' },
                { value: '2', label: '2nd Semester' },
                { value: '3', label: '3rd Semester' },
                { value: '4', label: '4th Semester' },
                { value: '5', label: '5th Semester' },
                { value: '6', label: '6th Semester' },
                { value: '7', label: '7th Semester' },
                { value: '8', label: '8th Semester' },
              ]}
            />

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" size="lg" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" variant="primary" className="flex-1" size="lg" loading={isLoading}>
                Create Account
              </Button>
            </div>
          </div>
        )}
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
          Sign in
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-muted">
        By signing up, you agree to our{' '}
        <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
        {' '}and{' '}
        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
      </p>
    </div>
  );
}
