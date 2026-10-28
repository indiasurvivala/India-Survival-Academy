/**
 * India Survival Academy — Enquiry Serverless API
 * Root Vercel Serverless Function: /api/enquiry
 *
 * Requirements:
 * 1. Sends enquiry notification email to admissions desk (ENQUIRY_TO_EMAIL).
 * 2. Sends confirmation email acknowledging receipt to the applicant.
 * 3. Integrates with Gmail SMTP via Nodemailer.
 * 4. Authenticates using SMTP_USER and Google App Password (SMTP_PASS).
 * 5. Configures STARTTLS on Port 587 (secure: false) or SSL on Port 465 (secure: true).
 * 6. Sets replyTo to applicant email so the academy can reply directly.
 * 7. Server-side validation, anti-spam honeypot, payload size limit, and secure error handling.
 * 8. Ephemeral in-memory rate limiting (documented for serverless constraints).
 * 9. Supports both Node.js (req, res) and Web standard (Request) runtimes.
 */

import nodemailer from 'nodemailer';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_PAYLOAD_BYTES = 100 * 1024; // 100 KB payload limit

function cleanupRateLimit(): void {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): boolean {
  cleanupRateLimit();
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const COURSE_TITLES: Record<string, string> = {
  '24h-survival-challenge': '24-Hour Survival Challenge (24 Hours)',
  '48h-wilderness-challenge': '48-Hour Wilderness Challenge (48 Hours)',
  '72h-expedition-challenge': '72-Hour Expedition Challenge (72 Hours)',
  'general-inquiry': 'General Academy Inquiry / Corporate Program'
};

export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  preferredBatch?: string;
  message: string;
  consent: boolean;
  website?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized?: EnquiryPayload;
}

export function validatePayload(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: { _global: 'Invalid request body. Expected JSON object.' } };
  }

  const data = body as Record<string, unknown>;

  if (data.website && typeof data.website === 'string' && data.website.trim().length > 0) {
    return {
      isValid: false,
      errors: { _spam: 'Bot detected via honeypot' }
    };
  }

  const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
  if (!fullName) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.length < 2 || fullName.length > 100) {
    errors.fullName = 'Full name must be between 2 and 100 characters.';
  }

  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(email) || email.length > 150) {
    errors.email = 'Please provide a valid email address.';
  }

  const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  const phoneDigits = phone.replace(/[\s-()+]/g, '');
  if (!phone) {
    errors.phone = 'Contact phone number is required.';
  } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Phone number must contain between 10 and 15 digits.';
  }

  const courseId = typeof data.courseId === 'string' ? data.courseId.trim() : '';
  if (!courseId) {
    errors.courseId = 'Please select an interested challenge course.';
  }

  const preferredBatch = typeof data.preferredBatch === 'string' ? data.preferredBatch.trim().slice(0, 120) : '';

  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!message) {
    errors.message = 'Please provide a message or background details.';
  } else if (message.length < 10) {
    errors.message = 'Please provide at least 10 characters describing your inquiry.';
  } else if (message.length > 3000) {
    errors.message = 'Message exceeds the 3000 character limit.';
  }

  const consent = data.consent === true || data.consent === 'true';
  if (!consent) {
    errors.consent = 'Participant consent acknowledging outdoor challenge conditions is required.';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitized: isValid
      ? {
          fullName,
          email,
          phone,
          courseId,
          preferredBatch,
          message,
          consent: true
        }
      : undefined
  };
}

export function buildAdminEmailHtml(data: EnquiryPayload, clientIp: string, submittedAt: string): string {
  const courseDisplay = COURSE_TITLES[data.courseId] || data.courseId;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Course Enquiry — India Survival Academy</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060a07; color: #f4f1ea; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #0c130e; border: 1px solid rgba(203, 163, 88, 0.3); border-radius: 12px; overflow: hidden; }
    .header { background: #060a07; padding: 24px; border-bottom: 2px solid #cba358; text-align: center; }
    .header h1 { font-size: 20px; color: #dfb86c; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.05em; }
    .header p { color: #8e9a8f; margin: 0; font-size: 13px; }
    .content { padding: 24px; }
    .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #cba358; font-weight: bold; margin: 18px 0 8px 0; border-bottom: 1px solid rgba(203, 163, 88, 0.15); padding-bottom: 4px; }
    .field-row { margin-bottom: 12px; font-size: 14px; line-height: 1.5; }
    .field-label { color: #8e9a8f; font-weight: 600; display: inline-block; width: 140px; }
    .field-value { color: #f4f1ea; font-weight: 500; }
    .field-value a { color: #dfb86c; text-decoration: underline; }
    .message-box { background: #17241b; border: 1px solid rgba(203, 163, 88, 0.2); border-radius: 8px; padding: 14px; font-size: 13px; line-height: 1.6; color: #f4f1ea; white-space: pre-wrap; margin-top: 6px; }
    .actions { padding: 20px 24px; background: #080d09; border-top: 1px solid rgba(203, 163, 88, 0.15); text-align: center; }
    .btn { display: inline-block; background: #cba358; color: #060a07; text-decoration: none; font-weight: bold; font-size: 13px; padding: 10px 20px; border-radius: 6px; margin: 4px 6px; }
    .btn-secondary { background: #17241b; color: #dfb86c; border: 1px solid rgba(203, 163, 88, 0.4); }
    .footer { padding: 16px 24px; background: #060a07; font-size: 11px; color: #5f6c60; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>India Survival Academy</h1>
      <p>New Wilderness Course Enquiry Received</p>
    </div>

    <div class="content">
      <div class="section-title">Applicant Contact Details</div>
      <div class="field-row">
        <span class="field-label">Full Name:</span>
        <span class="field-value">${escapeHtml(data.fullName)}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Email Address:</span>
        <span class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
      </div>
      <div class="field-row">
        <span class="field-label">Phone Number:</span>
        <span class="field-value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></span>
      </div>

      <div class="section-title">Program & Schedule Preferences</div>
      <div class="field-row">
        <span class="field-label">Requested Course:</span>
        <span class="field-value" style="color: #dfb86c; font-weight: bold;">${escapeHtml(courseDisplay)}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Preferred Batch:</span>
        <span class="field-value">${data.preferredBatch ? escapeHtml(data.preferredBatch) : '<em>No specific batch noted</em>'}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Safety Consent:</span>
        <span class="field-value" style="color: #6ee7b7;">&#10003; Confirmed (Outdoor Physical & Medical Disclosure)</span>
      </div>

      <div class="section-title">Applicant Background / Message</div>
      <div class="message-box">${escapeHtml(data.message)}</div>
    </div>

    <div class="actions">
      <a href="mailto:${escapeHtml(data.email)}?subject=India%20Survival%20Academy%20%E2%80%94%20Regarding%20Your%20${encodeURIComponent(courseDisplay)}%20Enquiry" class="btn">Reply to Applicant</a>
      <a href="tel:${escapeHtml(data.phone)}" class="btn btn-secondary">Call Applicant</a>
    </div>

    <div class="footer">
      Dispatched via Gmail SMTP • Submitted at ${escapeHtml(submittedAt)} • Client IP: ${escapeHtml(clientIp)}
    </div>
  </div>
</body>
</html>`;
}

export function buildAdminEmailText(data: EnquiryPayload, clientIp: string, submittedAt: string): string {
  const courseDisplay = COURSE_TITLES[data.courseId] || data.courseId;

  return `================================================
NEW COURSE ENQUIRY — INDIA SURVIVAL ACADEMY
================================================

APPLICANT DETAILS:
- Name:  ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}

COURSE PREFERENCES:
- Program:         ${courseDisplay}
- Preferred Batch: ${data.preferredBatch || 'Not specified'}
- Safety Consent:  Confirmed (Medical & Outdoor Conditions)

MESSAGE / OUTDOOR EXPERIENCE:
${data.message}

METADATA:
- Submitted At: ${submittedAt}
- Client IP:    ${clientIp}
================================================`;
}

export function buildApplicantEmailHtml(data: EnquiryPayload): string {
  const courseDisplay = COURSE_TITLES[data.courseId] || data.courseId;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Enquiry — India Survival Academy</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #060a07; color: #f4f1ea; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #0c130e; border: 1px solid rgba(203, 163, 88, 0.35); border-radius: 12px; overflow: hidden; }
    .header { background: #060a07; padding: 28px 24px; border-bottom: 2px solid #cba358; text-align: center; }
    .header h1 { font-size: 22px; color: #dfb86c; margin: 0 0 6px 0; letter-spacing: 0.05em; text-transform: uppercase; }
    .header p { color: #8e9a8f; margin: 0; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }
    .content { padding: 24px; }
    .greeting { font-size: 16px; color: #dfb86c; font-weight: 600; margin-bottom: 12px; }
    .intro { font-size: 14px; line-height: 1.6; color: #d1d5db; margin-bottom: 20px; }
    .details-box { background: #131c15; border: 1px solid rgba(203, 163, 88, 0.25); border-radius: 8px; padding: 18px; margin-bottom: 20px; }
    .details-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #cba358; font-weight: bold; margin-bottom: 12px; }
    .detail-row { margin-bottom: 8px; font-size: 13px; line-height: 1.5; }
    .detail-label { color: #8e9a8f; font-weight: 500; display: inline-block; width: 140px; }
    .detail-value { color: #f4f1ea; font-weight: 600; }
    .steps-box { background: #080d09; border-left: 3px solid #cba358; padding: 14px 18px; margin-bottom: 20px; font-size: 13px; line-height: 1.6; color: #d1d5db; }
    .steps-title { color: #dfb86c; font-weight: bold; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
    .contact-box { background: #17241b; border: 1px solid rgba(203, 163, 88, 0.2); border-radius: 8px; padding: 16px; text-align: center; font-size: 13px; color: #d1d5db; }
    .contact-link { color: #dfb86c; text-decoration: underline; font-weight: 600; }
    .footer { padding: 18px 24px; background: #060a07; font-size: 11px; color: #5f6c60; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>India Survival Academy</h1>
      <p>Vayam Adventure • Wilderness Training</p>
    </div>
    <div class="content">
      <div class="greeting">Hello ${escapeHtml(data.fullName)},</div>
      <p class="intro">
        Thank you for submitting your enquiry for <strong>${escapeHtml(courseDisplay)}</strong>. We have successfully received your information and our admissions team is reviewing your application.
      </p>

      <div class="details-box">
        <div class="details-title">Your Submitted Details</div>
        <div class="detail-row">
          <span class="detail-label">Program:</span>
          <span class="detail-value" style="color: #dfb86c;">${escapeHtml(courseDisplay)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Preferred Batch:</span>
          <span class="detail-value">${data.preferredBatch ? escapeHtml(data.preferredBatch) : 'Upcoming 2026 Batch'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Registered Phone:</span>
          <span class="detail-value">${escapeHtml(data.phone)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Registered Email:</span>
          <span class="detail-value">${escapeHtml(data.email)}</span>
        </div>
      </div>

      <div class="steps-box">
        <div class="steps-title">&#9658; What Happens Next?</div>
        <ol style="margin: 0; padding-left: 18px;">
          <li style="margin-bottom: 6px;"><strong>Application Review:</strong> Our training director reviews your background note and fitness suitability.</li>
          <li style="margin-bottom: 6px;"><strong>Direct Briefing Call:</strong> An academy admissions counselor will contact you within 24 hours via phone or email.</li>
          <li><strong>Batch Allocation & Prep:</strong> You will receive batch reporting schedules, basecamp location guidelines, and the survival gear checklist.</li>
        </ol>
      </div>

      <div class="contact-box">
        Need urgent assistance or have questions right away?<br>
        Call our desk directly at <a href="tel:+918319963922" class="contact-link">+91 83199 63922</a> or reply directly to this email.
      </div>
    </div>
    <div class="footer">
      India Survival Academy • Operational Basecamps in Rajasthan, India<br>
      Disciplined Wilderness Self-Reliance • Real-World Outdoor Challenges
    </div>
  </div>
</body>
</html>`;
}

export function buildApplicantEmailText(data: EnquiryPayload): string {
  const courseDisplay = COURSE_TITLES[data.courseId] || data.courseId;
  return `================================================
INDIA SURVIVAL ACADEMY — ENQUIRY CONFIRMATION
================================================

Hello ${data.fullName},

Thank you for your enquiry regarding:
${courseDisplay}

We have successfully registered your interest.

SUMMARY OF YOUR DETAILS:
- Applicant Name:   ${data.fullName}
- Program:          ${courseDisplay}
- Preferred Batch:  ${data.preferredBatch || 'Upcoming 2026 Batch'}
- Contact Phone:    ${data.phone}
- Email Address:    ${data.email}

WHAT HAPPENS NEXT?
1. Our training director will review your background note.
2. An academy admissions counselor will contact you within 24 hours via phone or email.
3. You will receive batch reporting schedules, basecamp location guidelines, and the survival gear checklist.

If you have urgent questions, you can reach our team at:
- Phone: +91 83199 63922
- Email: INDIASURVIVALA@GMAIL.COM

Stay prepared,
India Survival Academy Team
Rajasthan, India
================================================`;
}

export function getSmtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = port === 465;
  const user = process.env.SMTP_USER || '';
  const rawPass = process.env.SMTP_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');
  const toEmail = process.env.ENQUIRY_TO_EMAIL || user || 'INDIASURVIVALA@GMAIL.COM';

  return { host, port, secure, user, pass, toEmail };
}

export function createSmtpTransporter(customTransport?: any) {
  if (customTransport) {
    return customTransport;
  }
  const config = getSmtpConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    },
    ...(config.secure ? {} : { requireTLS: true })
  });
}

export default async function handler(req: any, res?: any): Promise<any> {
  const isWebStandard = typeof Request !== 'undefined' && req instanceof Request && !res;

  if (req.method === 'OPTIONS') {
    if (isWebStandard) {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  const sendJsonResponse = (status: number, data: Record<string, unknown>) => {
    if (isWebStandard) {
      return new Response(JSON.stringify(data), {
        status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(status).json(data);
  };

  if (req.method !== 'POST') {
    return sendJsonResponse(405, {
      success: false,
      error: 'Method Not Allowed. Only POST requests are accepted.'
    });
  }

  try {
    const contentLength = isWebStandard
      ? (req as Request).headers.get('content-length')
      : req.headers?.['content-length'];

    if (contentLength && Number(contentLength) > MAX_PAYLOAD_BYTES) {
      return sendJsonResponse(413, {
        success: false,
        error: 'Payload Too Large. Request size exceeds the 100KB limit.'
      });
    }

    const forwardedHeader = isWebStandard
      ? (req as Request).headers.get('x-forwarded-for')
      : req.headers?.['x-forwarded-for'];
    const realIpHeader = isWebStandard
      ? (req as Request).headers.get('x-real-ip')
      : req.headers?.['x-real-ip'];

    const clientIp = (
      (typeof forwardedHeader === 'string' ? forwardedHeader.split(',')[0].trim() : null) ||
      (typeof realIpHeader === 'string' ? realIpHeader : null) ||
      req.socket?.remoteAddress ||
      '127.0.0.1'
    );

    if (!checkRateLimit(clientIp)) {
      return sendJsonResponse(429, {
        success: false,
        error: 'Too many enquiries submitted from this connection. Please wait 10 minutes before trying again or email us directly at INDIASURVIVALA@GMAIL.COM.'
      });
    }

    let body: any;
    if (isWebStandard) {
      const text = await (req as Request).text();
      if (text.length > MAX_PAYLOAD_BYTES) {
        return sendJsonResponse(413, {
          success: false,
          error: 'Payload Too Large. Request body exceeds the 100KB limit.'
        });
      }
      body = text ? JSON.parse(text) : {};
    } else {
      if (typeof req.body === 'string') {
        if (req.body.length > MAX_PAYLOAD_BYTES) {
          return sendJsonResponse(413, {
            success: false,
            error: 'Payload Too Large. Request body exceeds the 100KB limit.'
          });
        }
        body = JSON.parse(req.body);
      } else {
        body = req.body;
      }
    }

    const validation = validatePayload(body);

    if (validation.errors._spam) {
      return sendJsonResponse(200, {
        success: true,
        message: 'Your enquiry has been received.'
      });
    }

    if (!validation.isValid || !validation.sanitized) {
      return sendJsonResponse(400, {
        success: false,
        error: 'Validation failed. Please correct the highlighted fields.',
        errors: validation.errors
      });
    }

    const sanitizedData = validation.sanitized;
    const submittedAt = new Date().toISOString();

    const smtpConfig = getSmtpConfig();

    if (!smtpConfig.user || !smtpConfig.pass) {
      console.error('[Enquiry API Error] SMTP_USER or SMTP_PASS environment variable is missing.');
      return sendJsonResponse(500, {
        success: false,
        error: 'Email service configuration is incomplete on the server. Please contact INDIASURVIVALA@GMAIL.COM directly.'
      });
    }

    const courseDisplay = COURSE_TITLES[sanitizedData.courseId] || sanitizedData.courseId;
    const adminSubject = `[New Academy Enquiry] ${sanitizedData.fullName} — ${courseDisplay}`;
    const adminHtml = buildAdminEmailHtml(sanitizedData, clientIp, submittedAt);
    const adminText = buildAdminEmailText(sanitizedData, clientIp, submittedAt);

    const applicantSubject = `Enquiry Received: ${courseDisplay} — India Survival Academy`;
    const applicantHtml = buildApplicantEmailHtml(sanitizedData);
    const applicantText = buildApplicantEmailText(sanitizedData);

    const transporter = createSmtpTransporter();

    // 1. Dispatch enquiry to academy admissions desk
    await transporter.sendMail({
      from: `"India Survival Academy" <${smtpConfig.user}>`,
      to: smtpConfig.toEmail,
      replyTo: sanitizedData.email,
      subject: adminSubject,
      text: adminText,
      html: adminHtml
    });

    // 2. Dispatch confirmation to applicant
    await transporter.sendMail({
      from: `"India Survival Academy" <${smtpConfig.user}>`,
      to: sanitizedData.email,
      replyTo: smtpConfig.toEmail,
      subject: applicantSubject,
      text: applicantText,
      html: applicantHtml
    });

    return sendJsonResponse(200, {
      success: true,
      message: 'Your enquiry has been successfully delivered and a confirmation email has been dispatched to your inbox.'
    });

  } catch (error: any) {
    const errorCode = error?.code || error?.name || 'UNKNOWN_ERROR';
    console.error('[Enquiry Handler Error]', errorCode, error?.message);

    return sendJsonResponse(502, {
      success: false,
      error: 'Unable to deliver enquiry via mail gateway at this moment. Please email our admissions desk directly.'
    });
  }
}
