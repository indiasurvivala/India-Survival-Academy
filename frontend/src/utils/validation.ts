import { EnquiryFormData, FormErrors } from '../types';

/**
 * Validates the student enquiry form data
 *
 * Ensures all inputs meet accessibility and business validation standards
 * before displaying the honest frontend demonstration state.
 */
export const validateEnquiryForm = (data: EnquiryFormData): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};

  // Full Name validation
  if (!data.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Please provide an email address for communication.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g., explorer@example.com).';
  }

  // Phone validation (Indian / International numbers)
  const phoneDigits = data.phone.replace(/[\s-()+]/g, '');
  if (!data.phone.trim()) {
    errors.phone = 'Please provide a contact phone number.';
  } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid phone number with 10 to 15 digits.';
  }

  // Course selection validation
  if (!data.courseId) {
    errors.courseId = 'Please select a challenge program you are interested in.';
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Please share your background, fitness level, or specific questions.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Please provide a slightly more detailed note (at least 10 characters).';
  }

  // Consent checkbox validation
  if (!data.consent) {
    errors.consent = 'Please acknowledge that outdoor wilderness training carries inherent physical demands.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
