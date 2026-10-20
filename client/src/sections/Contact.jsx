import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitContactForm } from '../services/api';
import { IconSpaceMail } from '../components/AnimatedIcon';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    bot_field: '', // Honeypot field for bot detection
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    responseMsg: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Your name is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus({ submitting: true, success: false, error: null, responseMsg: '' });

    try {
      const result = await submitContactForm(formData);

      setStatus({
        submitting: false,
        success: true,
        error: null,
        responseMsg: result.message || 'Your message was successfully recorded in MongoDB!',
      });

      // Reset form
      setFormData({ name: '', email: '', message: '', bot_field: '' });

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch (err) {
        // Confetti optional enhancement
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Failed to submit message. Please try again.',
        responseMsg: '',
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-secondary/15 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3 border border-primary/20">
            <IconSpaceMail size={16} />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Want to discuss a project, software, or a possible collaboration? Send me a message through the contact form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-border space-y-6">
              <h3 className="font-heading font-bold text-xl text-foreground">
                Verified Contact Details
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:rohittak006@gmail.com"
                  className="flex items-start gap-4 p-3.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">Direct Email</div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      rohittak006@gmail.com
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+917568098052"
                  className="flex items-start gap-4 p-3.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">Mobile Phone</div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                      +91-7568098052
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-secondary/50 border border-border">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">Base Location</div>
                    <div className="text-sm font-semibold text-foreground">
                      Jaipur, Rajasthan, India
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Online Profiles
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/RohitTak06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs font-semibold border border-border transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rohit-tak-7150762b8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 text-xs font-semibold border border-blue-500/20 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-border">
              <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Directly connected to our Node.js / Express backend with Mongoose ODM persistence.
              </p>

              {/* Status Banner */}
              {status.success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-start gap-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm font-medium">
                    <strong className="block font-bold">Message Saved!</strong>
                    {status.responseMsg}
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm font-medium">
                    <strong className="block font-bold">Submission Error</strong>
                    {status.error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot Bot Field (Hidden) */}
                <input
                  type="text"
                  name="bot_field"
                  value={formData.bot_field}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-foreground mb-1.5">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status.submitting}
                    placeholder="e.g. Priyanshu Sharma"
                    className={`w-full px-4 py-2.5 rounded-xl bg-secondary/60 border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      fieldErrors.name ? 'border-destructive ring-1 ring-destructive' : 'border-control'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-destructive">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-foreground mb-1.5">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status.submitting}
                    placeholder="e.g. recruiter@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-secondary/60 border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      fieldErrors.email ? 'border-destructive ring-1 ring-destructive' : 'border-control'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-foreground mb-1.5">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status.submitting}
                    placeholder="Hi Rohit, I would like to talk about your projects..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-secondary/60 border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                      fieldErrors.message ? 'border-destructive ring-1 ring-destructive' : 'border-control'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="mt-1 text-xs text-destructive">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/15 hover:brightness-105 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to MongoDB...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Verified Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
