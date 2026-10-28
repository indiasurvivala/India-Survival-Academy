import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Send, Mail, Phone } from 'lucide-react';
import { EnquiryFormData, FormErrors } from '../../types';
import { validateEnquiryForm } from '../../utils/validation';
import { coursesData } from '../../data/courses';
import { siteConfig } from '../../data/siteConfig';
import { Button } from '../common/Button';

interface EnquiryFormProps {
  initialCourseId?: string;
  className?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialCourseId = '',
  className = ''
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    courseId: initialCourseId,
    preferredBatch: '',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const { isValid, errors: validationErrors } = validateEnquiryForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          website: honeypot
        })
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        if (result?.errors && typeof result.errors === 'object') {
          setErrors((prev) => ({ ...prev, ...result.errors }));
        }
        throw new Error(result?.error || 'Unable to submit enquiry. Please try again.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('[Enquiry Submission Error]', err);
      setSubmitError(
        err.message ||
        'Unable to deliver enquiry via mail gateway right now. Please email our admissions desk directly at INDIASURVIVALA@GMAIL.COM.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      courseId: initialCourseId,
      preferredBatch: '',
      message: '',
      consent: false
    });
    setErrors({});
    setSubmitError(null);
    setHoneypot('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className={`wilderness-card p-8 md:p-10 rounded-xl border border-gold-500/40 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-forest-900 border border-gold-500/40 flex items-center justify-center mx-auto mb-5 text-gold-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="font-heading font-bold text-2xl text-earth-100 mb-2">
          Enquiry Successfully Submitted!
        </h3>

        <div className="max-w-lg mx-auto bg-forest-900/80 p-5 rounded-lg border border-olive-700/50 text-left my-6 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-start gap-2 text-gold-400 font-semibold mb-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Delivered to Admissions & Confirmation Dispatched</span>
          </div>
          <p className="text-earth-300">
            Your outdoor training enquiry has been forwarded directly to our admissions desk, and a confirmation email has been dispatched to <strong className="text-gold-300">{formData.email}</strong>.
          </p>
          <ul className="list-disc pl-5 text-earth-200 space-y-1">
            <li><strong>Applicant:</strong> {formData.fullName}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Phone:</strong> {formData.phone}</li>
            <li><strong>Program:</strong> {coursesData.find(c => c.id === formData.courseId)?.title || formData.courseId}</li>
          </ul>
          <p className="text-earth-400 pt-1 text-[11px] italic">
            Note: Please check your inbox (and spam/promotions folder) for your academy confirmation and briefing instructions. Our counselors will contact you within 24 hours.
          </p>
          <div className="pt-2 text-xs text-earth-300 border-t border-olive-800/60 mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Call:{' '}</span>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-gold-400 hover:text-gold-300 underline font-semibold"
              >
                {siteConfig.officialPhone}
              </a>
            </span>
            <span className="text-earth-500 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Email:{' '}</span>
              <a
                href={`mailto:${siteConfig.officialEmail}`}
                className="text-gold-400 hover:text-gold-300 underline font-semibold"
              >
                {siteConfig.officialEmail}
              </a>
            </span>
          </div>
        </div>

        <Button variant="secondary" onClick={handleReset} size="md">
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`wilderness-card p-6 sm:p-8 md:p-10 rounded-xl border border-gold-500/20 ${className}`} noValidate>
      {/* Invisible Honeypot Field for Spam Bot Protection */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website-hp">Do not fill this field</label>
        <input
          id="website-hp"
          name="website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-earth-100 mb-1">
          Enquire About an Academy Challenge
        </h3>
        <p className="text-xs sm:text-sm text-earth-300">
          Register your interest for upcoming 2026 Rajasthan batch announcements.
        </p>
      </div>

      {submitError && (
        <div className="mb-5 p-3.5 rounded-lg bg-red-950/60 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <strong className="block text-red-300 font-semibold">Submission Alert</strong>
            <p className="text-red-200/90">{submitError}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-earth-200 mb-1.5">
            Full Name <span className="text-gold-400">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Vikramaditya Singh"
            className={`w-full px-4 py-2.5 rounded bg-forest-900 border text-earth-100 text-sm focus:ring-2 focus:ring-gold-500 transition-colors ${
              errors.fullName ? 'border-red-500/80 bg-red-950/10' : 'border-olive-700/60 hover:border-olive-500'
            }`}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-earth-200 mb-1.5">
              Email Address <span className="text-gold-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="explorer@example.com"
              className={`w-full px-4 py-2.5 rounded bg-forest-900 border text-earth-100 text-sm focus:ring-2 focus:ring-gold-500 transition-colors ${
                errors.email ? 'border-red-500/80 bg-red-950/10' : 'border-olive-700/60 hover:border-olive-500'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-earth-200 mb-1.5">
              Contact Phone <span className="text-gold-400">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-2.5 rounded bg-forest-900 border text-earth-100 text-sm focus:ring-2 focus:ring-gold-500 transition-colors ${
                errors.phone ? 'border-red-500/80 bg-red-950/10' : 'border-olive-700/60 hover:border-olive-500'
              }`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Interested Course Dropdown */}
        <div>
          <label htmlFor="courseId" className="block text-xs font-semibold uppercase tracking-wider text-earth-200 mb-1.5">
            Interested Challenge Course <span className="text-gold-400">*</span>
          </label>
          <select
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            style={{ colorScheme: 'dark' }}
            className={`w-full px-4 py-2.5 rounded bg-forest-900 border text-earth-100 text-sm focus:ring-2 focus:ring-gold-500 transition-colors [&>option]:bg-forest-900 [&>option]:text-earth-100 ${
              errors.courseId ? 'border-red-500/80 bg-red-950/10' : 'border-olive-700/60 hover:border-olive-500'
            }`}
            aria-invalid={!!errors.courseId}
            aria-describedby={errors.courseId ? 'courseId-error' : undefined}
          >
            <option value="" className="bg-forest-900 text-earth-100" style={{ backgroundColor: '#0c130e', color: '#f4f1ea' }}>
              -- Choose a Challenge Course --
            </option>
            {coursesData.map((course) => (
              <option 
                key={course.id} 
                value={course.id} 
                className="bg-forest-900 text-earth-100"
                style={{ backgroundColor: '#0c130e', color: '#f4f1ea' }}
              >
                {course.title} ({course.duration})
              </option>
            ))}
            <option 
              value="general-inquiry" 
              className="bg-forest-900 text-earth-100"
              style={{ backgroundColor: '#0c130e', color: '#f4f1ea' }}
            >
              General Academy Inquiry / Corporate Program
            </option>
          </select>
          {errors.courseId && (
            <p id="courseId-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.courseId}</span>
            </p>
          )}
        </div>

        {/* Preferred Batch / Date (Optional) */}
        <div>
          <label htmlFor="preferredBatch" className="block text-xs font-semibold uppercase tracking-wider text-earth-200 mb-1.5">
            Preferred Batch or Season <span className="text-earth-400 font-normal text-[11px]">(Optional)</span>
          </label>
          <input
            id="preferredBatch"
            name="preferredBatch"
            type="text"
            value={formData.preferredBatch}
            onChange={handleChange}
            placeholder="e.g. Winter 2026 / Weekend batch"
            className="w-full px-4 py-2.5 rounded bg-forest-900 border border-olive-700/60 text-earth-100 text-sm focus:ring-2 focus:ring-gold-500 hover:border-olive-500 transition-colors"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-earth-200 mb-1.5">
            Background & Experience / Specific Questions <span className="text-gold-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your outdoor background, physical fitness, or any specific questions regarding venue approvals and gear."
            className={`w-full px-4 py-2.5 rounded bg-forest-900 border text-earth-100 text-sm focus:ring-2 focus:ring-gold-500 transition-colors ${
              errors.message ? 'border-red-500/80 bg-red-950/10' : 'border-olive-700/60 hover:border-olive-500'
            }`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div>
          <label htmlFor="consent-checkbox" className="flex items-start gap-3 cursor-pointer select-none">
            <input
              id="consent-checkbox"
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 w-4 h-4 rounded bg-forest-900 border-olive-600 text-gold-500 focus:ring-gold-500"
            />
            <span className="text-xs text-earth-300 leading-normal">
              I understand that wilderness challenges involve outdoor physical activities in natural environments, and that all training is subject to location permissions and medical fitness disclosure. <span className="text-gold-400">*</span>
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.consent}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
            icon={<Send className="w-4 h-4" />}
          >
            {isSubmitting ? 'Validating Submission...' : 'Submit Course Enquiry'}
          </Button>

          <p className="text-[11px] text-earth-400 text-center mt-3">
            Frontend demonstration interface • No personal data is stored or transmitted without an active backend.
          </p>

          <div className="mt-4 p-3.5 rounded-lg bg-forest-950/80 border border-olive-800/60 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-earth-300">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Need immediate assistance?</span>
            </div>
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-gold-400 hover:text-gold-300 font-semibold underline underline-offset-2 transition-colors"
                aria-label={`Call ${siteConfig.officialPhone}`}
              >
                {siteConfig.officialPhone}
              </a>
              <span className="text-earth-500">•</span>
              <a
                href={`mailto:${siteConfig.officialEmail}`}
                className="text-gold-400 hover:text-gold-300 font-semibold underline underline-offset-2 transition-colors break-all"
                aria-label={`Send direct email to ${siteConfig.officialEmail}`}
              >
                {siteConfig.officialEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
