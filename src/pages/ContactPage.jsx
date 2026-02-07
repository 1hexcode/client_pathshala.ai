import { useState } from 'react';
import { Card, Button, Input, Select } from '../components/common';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      title: 'Email',
      value: 'support@PathshalaAI.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Response Time',
      value: 'Within 24 hours',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Location',
      value: 'San Francisco, CA',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      question: 'How do I upload notes?',
      answer: 'Simply create an account, navigate to the Upload page, and follow the step-by-step process to share your study materials.',
    },
    {
      question: 'Are the notes free to access?',
      answer: 'Yes! All notes on PathshalaAI are completely free to view and download. We believe in open access to education.',
    },
    {
      question: 'How does the AI assistant work?',
      answer: 'Our AI assistant is trained to help with academic questions. Simply type your question and get instant, helpful responses.',
    },
    {
      question: 'Can I request notes for a specific subject?',
      answer: 'Absolutely! Use the contact form to submit requests, and we\'ll try to source relevant materials from our community.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-black from-primary to-primary-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-white/80">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-muted mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button variant="primary" onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input
                        label="Your Name"
                        name="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                      
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                    </div>
                    
                    <Select
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      options={[
                        { value: '', label: 'Select a subject' },
                        { value: 'general', label: 'General Inquiry' },
                        { value: 'support', label: 'Technical Support' },
                        { value: 'feedback', label: 'Feedback' },
                        { value: 'partnership', label: 'Partnership' },
                        { value: 'content', label: 'Content Request' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none ${
                          errors.message ? 'border-error' : 'border-border'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-error">{errors.message}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-full"
                      loading={isSubmitting}
                    >
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-muted">{info.title}</div>
                      <div className="font-medium text-foreground">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {['Twitter', 'GitHub', 'LinkedIn'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-surface hover:bg-hover flex items-center justify-center text-muted hover:text-foreground transition-colors"
                  >
                    {platform === 'Twitter' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    )}
                    {platform === 'GitHub' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {platform === 'LinkedIn' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <Card key={faq.question} className="p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
