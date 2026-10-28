import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

function getSmtpConfig() {
  const env: Record<string, string> = {};

  const tryReadEnv = (filePath: string) => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)$/);
          if (match) {
            let val = match[2].trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            env[match[1]] = val;
          }
        }
      });
    }
  };

  // Read root .env first, then frontend/.env, then .env.local (so local files overwrite root)
  tryReadEnv(path.resolve(process.cwd(), '../.env'));
  tryReadEnv(path.resolve(process.cwd(), '.env'));
  tryReadEnv(path.resolve(process.cwd(), '.env.local'));

  // Prioritize values freshly read from .env over stale process.env cache
  const host = env.SMTP_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(env.SMTP_PORT || process.env.SMTP_PORT || '587', 10);
  const user = env.SMTP_USER || process.env.SMTP_USER || '';
  const rawPass = env.SMTP_PASS || process.env.SMTP_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');
  const toEmail = env.ENQUIRY_TO_EMAIL || process.env.ENQUIRY_TO_EMAIL || user || 'INDIASURVIVALA@GMAIL.COM';

  // Synchronize process.env so any downstream code sees latest values
  process.env.SMTP_HOST = host;
  process.env.SMTP_PORT = String(port);
  process.env.SMTP_USER = user;
  process.env.SMTP_PASS = pass;
  process.env.ENQUIRY_TO_EMAIL = toEmail;

  return { host, port, user, pass, toEmail };
}

const COURSE_TITLES: Record<string, string> = {
  '24h-survival-challenge': '24-Hour Survival Challenge (24 Hours)',
  '48h-wilderness-challenge': '48-Hour Wilderness Challenge (48 Hours)',
  '72h-expedition-challenge': '72-Hour Expedition Challenge (72 Hours)',
  'general-inquiry': 'General Academy Inquiry / Corporate Program'
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildAdminEmailHtml(data: any, clientIp: string, submittedAt: string, toEmail: string): string {
  const courseDisplay = COURSE_TITLES[data.courseId] || data.courseId;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Course Enquiry — India Survival Academy</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #060a07; color: #f4f1ea; margin: 0; padding: 24px; }
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
      Dispatched to ${escapeHtml(toEmail)} via Gmail SMTP • Submitted at ${escapeHtml(submittedAt)} • Client IP: ${escapeHtml(clientIp)}
    </div>
  </div>
</body>
</html>`;
}

function buildApplicantEmailHtml(data: any, officialEmail: string): string {
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
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; line-height: 1.5; }
    .detail-label { color: #8e9a8f; font-weight: 500; }
    .detail-value { color: #f4f1ea; font-weight: 600; text-align: right; }
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
        Call our desk directly at <a href="tel:+918319963922" class="contact-link">+91 83199 63922</a> or reply directly to this email at <a href="mailto:${escapeHtml(officialEmail)}" class="contact-link">${escapeHtml(officialEmail)}</a>.
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

function enquiryDevApiPlugin(): Plugin {
  return {
    name: 'enquiry-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/enquiry' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');

            try {
              const body = JSON.parse(bodyStr || '{}');

              // Honeypot check
              if (body.website && String(body.website).trim().length > 0) {
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, message: 'Your enquiry has been received.' }));
                return;
              }

              const fullName = String(body.fullName || '').trim();
              const email = String(body.email || '').trim().toLowerCase();
              const phone = String(body.phone || '').trim();
              const courseId = String(body.courseId || '').trim();
              const message = String(body.message || '').trim();
              const preferredBatch = String(body.preferredBatch || '').trim();

              const errors: Record<string, string> = {};
              if (!fullName || fullName.length < 2) errors.fullName = 'Full name must be at least 2 characters.';
              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Valid email is required.';
              if (!phone || phone.replace(/\D/g, '').length < 10) errors.phone = 'Valid 10-digit phone number is required.';
              if (!courseId) errors.courseId = 'Please select a course.';
              if (!message || message.length < 10) errors.message = 'Please provide a message of at least 10 characters.';

              if (Object.keys(errors).length > 0) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, errors, error: 'Validation failed.' }));
                return;
              }

              const config = getSmtpConfig();

              console.log('[Dev Server] Dispatching enquiry via Gmail SMTP...');
              console.log(`[Dev Server] Active SMTP Sender Account: ${config.user}`);
              console.log(`[Dev Server] Active Admin Destination: ${config.toEmail}`);
              console.log(`[Dev Server] Active Applicant Recipient: ${email}`);

              if (!config.user || !config.pass) {
                console.warn('[Dev Server] SMTP_USER or SMTP_PASS missing in .env! Emails cannot be dispatched.');
                res.statusCode = 500;
                res.end(JSON.stringify({
                  success: false,
                  error: 'SMTP credentials missing. Please check SMTP_USER and SMTP_PASS in .env.'
                }));
                return;
              }

              const transporter = nodemailer.createTransport({
                host: config.host,
                port: config.port,
                secure: config.port === 465,
                auth: {
                  user: config.user,
                  pass: config.pass
                },
                ...(config.port === 465 ? {} : { requireTLS: true })
              });

              const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
              const courseDisplay = COURSE_TITLES[courseId] || courseId;

              // 1. Send Admin Notification Email
              const adminSubject = `[New Academy Enquiry] ${fullName} — ${courseDisplay}`;
              const adminHtml = buildAdminEmailHtml(body, '127.0.0.1 (Local Dev)', submittedAt, config.toEmail);

              await transporter.sendMail({
                from: `"India Survival Academy" <${config.user}>`,
                to: config.toEmail,
                replyTo: email,
                subject: adminSubject,
                html: adminHtml
              });
              console.log(`[Dev Server] ✓ Successfully dispatched notification to Admin: ${config.toEmail}`);

              // 2. Send Applicant Confirmation Email
              const applicantSubject = `Enquiry Received: ${courseDisplay} — India Survival Academy`;
              const applicantHtml = buildApplicantEmailHtml(body, config.toEmail);

              await transporter.sendMail({
                from: `"India Survival Academy" <${config.user}>`,
                to: email,
                replyTo: config.toEmail,
                subject: applicantSubject,
                html: applicantHtml
              });
              console.log(`[Dev Server] ✓ Successfully dispatched confirmation email to Applicant: ${email}`);

              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                message: 'Your enquiry has been delivered to admissions, and a confirmation email has been sent to your inbox!'
              }));

            } catch (err: any) {
              console.error('[Dev Server] ✗ Error sending email via SMTP:', err?.message || err);
              res.statusCode = 502;
              res.end(JSON.stringify({
                success: false,
                error: `Unable to send email: ${err?.message || 'SMTP delivery failure'}`
              }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), enquiryDevApiPlugin()],
  server: {
    port: 3000,
    open: true
  }
});
