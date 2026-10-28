/**
 * Automated Verification Test Suite for India Survival Academy Enquiry API
 * Using Mocked Nodemailer Transport (Zero real emails dispatched)
 */

import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import handler, { validatePayload, buildAdminEmailHtml, buildAdminEmailText, getSmtpConfig } from '../api/enquiry.ts';

// Recorded mail dispatches
let dispatchedEmails: any[] = [];
let transporterConfig: any = null;
let shouldFailSend = false;

// Mock nodemailer.createTransport
const originalCreateTransport = nodemailer.createTransport;
(nodemailer as any).createTransport = (config: any) => {
  transporterConfig = config;
  return {
    sendMail: async (options: any) => {
      if (shouldFailSend) {
        const err: any = new Error('Invalid login: 535-5.7.8 Username and Password not accepted');
        err.code = 'EAUTH';
        err.responseCode = 535;
        throw err;
      }
      dispatchedEmails.push(options);
      return { messageId: '<mocked-message-id@indiasurvival>' };
    }
  };
};

// Helper to create mock Node.js req and res
function createMockReqRes(options: {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  remoteAddress?: string;
}) {
  const req = {
    method: options.method || 'POST',
    headers: options.headers || { 'content-type': 'application/json' },
    body: options.body,
    socket: { remoteAddress: options.remoteAddress || '127.0.0.1' }
  };

  let statusCode = 200;
  const headers: Record<string, string> = {};
  let responseData: any = null;

  const res = {
    statusCode,
    setHeader: (k: string, v: string) => { headers[k.toLowerCase()] = v; },
    status: (code: number) => {
      statusCode = code;
      res.statusCode = code;
      return res;
    },
    json: (data: any) => {
      responseData = data;
      return res;
    },
    end: () => res
  };

  return { req, res, getStatusCode: () => statusCode, getResponseData: () => responseData, getHeaders: () => headers };
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('🧪 Starting India Survival Academy SMTP & API Test Suite');
  console.log('======================================================\n');

  // Set environment variables for tests
  process.env.SMTP_HOST = 'smtp.gmail.com';
  process.env.SMTP_PORT = '587';
  process.env.SMTP_USER = 'INDIASURVIVALA@GMAIL.COM';
  process.env.SMTP_PASS = 'mock_app_password_16char';
  process.env.ENQUIRY_TO_EMAIL = 'INDIASURVIVALA@GMAIL.COM';

  let totalTests = 0;
  let passedTests = 0;

  async function test(name: string, fn: () => Promise<void> | void) {
    totalTests++;
    dispatchedEmails = [];
    shouldFailSend = false;
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passedTests++;
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error('     Error details:', err.message);
      throw err;
    }
  }

  // TEST 1: Transporter Configuration Check
  await test('1. SMTP Transporter config uses Port 587, STARTTLS, and Google host', () => {
    const config = getSmtpConfig();
    assert.equal(config.host, 'smtp.gmail.com');
    assert.equal(config.port, 587);
    assert.equal(config.secure, false, 'Port 587 must use STARTTLS (secure: false)');
    assert.equal(config.user, 'INDIASURVIVALA@GMAIL.COM');
    assert.equal(config.toEmail, 'INDIASURVIVALA@GMAIL.COM');
  });

  // TEST 2: Valid Enquiry Dispatch (Strict Single-Recipient)
  await test('2. Successful enquiry sends ONLY to INDIASURVIVALA@GMAIL.COM and never to visitor', async () => {
    const applicantEmail = 'explorer.vikram@example.com';
    const payload = {
      fullName: 'Vikramaditya Rathore',
      email: applicantEmail,
      phone: '+91 98765 43210',
      courseId: '24h-survival-challenge',
      preferredBatch: 'Winter 2026',
      message: 'Looking forward to learning primitive firecraft and navigation.',
      consent: true,
      website: '' // Empty honeypot
    };

    const { req, res, getStatusCode, getResponseData } = createMockReqRes({ body: payload });
    await handler(req, res);

    assert.equal(getStatusCode(), 200);
    assert.equal(getResponseData().success, true);

    // CRITICAL REQUIREMENT 1: Only ONE email dispatched
    assert.equal(dispatchedEmails.length, 1, 'Strictly only ONE email must be dispatched');

    const email = dispatchedEmails[0];

    // CRITICAL REQUIREMENT 2: Recipient is EXCLUSIVELY INDIASURVIVALA@GMAIL.COM
    assert.equal(email.to, 'INDIASURVIVALA@GMAIL.COM', 'Target must be INDIASURVIVALA@GMAIL.COM');
    assert.notEqual(email.to, applicantEmail, 'Email must NEVER be sent to applicant');

    // CRITICAL REQUIREMENT 3: replyTo is applicant
    assert.equal(email.replyTo, applicantEmail, 'replyTo must be set to applicant email for direct reply');

    // CRITICAL REQUIREMENT 4: Sender is academy
    assert.ok(email.from.includes('INDIASURVIVALA@GMAIL.COM'), 'Sender must be the academy account');
    assert.ok(!email.from.includes(applicantEmail), 'Applicant email must never be used as sender');

    // Content check
    assert.ok(email.subject.includes('Vikramaditya Rathore'), 'Subject should contain applicant name');
    assert.ok(email.html.includes('24-Hour Survival Challenge'), 'HTML should display human-readable course title');
    assert.ok(email.text.includes('INDIASURVIVALA@GMAIL.COM'), 'Plain text should reference academy destination');
  });

  // TEST 3: Port 465 SSL Support
  await test('3. Port 465 switches secure flag to true (SSL)', () => {
    process.env.SMTP_PORT = '465';
    const config = getSmtpConfig();
    assert.equal(config.port, 465);
    assert.equal(config.secure, true, 'Port 465 must use SSL (secure: true)');
    process.env.SMTP_PORT = '587'; // restore
  });

  // TEST 4: Honeypot Protection (Zero Emails on Bot Submission)
  await test('4. Honeypot traps bots silently without sending any email', async () => {
    const botPayload = {
      fullName: 'Spam Bot',
      email: 'bot@spamnetwork.com',
      phone: '+91 99999 99999',
      courseId: '24h-survival-challenge',
      message: 'Cheap SEO backlinks and pharmaceuticals',
      consent: true,
      website: 'https://spam-link.ru' // Honeypot filled!
    };

    const { req, res, getStatusCode, getResponseData } = createMockReqRes({ body: botPayload });
    await handler(req, res);

    assert.equal(getStatusCode(), 200, 'Returns 200 so bot does not retry or adapt');
    assert.equal(getResponseData().success, true);
    assert.equal(dispatchedEmails.length, 0, 'Zero emails dispatched on honeypot trigger');
  });

  // TEST 5: HTTP Method Enforcement (POST Only)
  await test('5. Rejects GET, PUT, and DELETE with HTTP 405', async () => {
    for (const method of ['GET', 'PUT', 'DELETE']) {
      const { req, res, getStatusCode, getResponseData } = createMockReqRes({ method });
      await handler(req, res);
      assert.equal(getStatusCode(), 405);
      assert.equal(getResponseData().success, false);
      assert.ok(getResponseData().error.includes('POST'));
    }
  });

  // TEST 6: Validation Errors Handling
  await test('6. Rejects invalid or missing fields with HTTP 400 and keeps form retryable', async () => {
    const invalidPayload = {
      fullName: '',
      email: 'invalid-email-no-at',
      phone: '123', // too short
      courseId: '',
      message: 'short', // less than 10 chars
      consent: false
    };

    const { req, res, getStatusCode, getResponseData } = createMockReqRes({ body: invalidPayload });
    await handler(req, res);

    assert.equal(getStatusCode(), 400);
    assert.equal(getResponseData().success, false);
    assert.ok(getResponseData().errors.fullName);
    assert.ok(getResponseData().errors.email);
    assert.ok(getResponseData().errors.phone);
    assert.ok(getResponseData().errors.courseId);
    assert.ok(getResponseData().errors.message);
    assert.ok(getResponseData().errors.consent);
    assert.equal(dispatchedEmails.length, 0);
  });

  // TEST 7: HTML Injection Escaping
  await test('7. Escapes HTML entities to prevent HTML/XSS injection in email template', () => {
    const maliciousPayload = {
      fullName: '<script>alert("xss")</script>',
      email: 'hacker@example.com',
      phone: '+91 98765 43210',
      courseId: '24h-survival-challenge',
      message: '<img src=x onerror="steal()"> & <b>Bold</b>',
      consent: true
    };

    const html = buildAdminEmailHtml(maliciousPayload as any, '1.2.3.4', '2026-10-27T00:00:00Z');
    assert.ok(!html.includes('<script>'), 'Script tags must be escaped');
    assert.ok(html.includes('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'));
    assert.ok(!html.includes('<img src=x onerror='), 'Image tags must be escaped');
    assert.ok(html.includes('&lt;img src=x onerror=&quot;steal()&quot;&gt;'));
  });

  // TEST 8: Request Payload Size Limits
  await test('8. Rejects request payloads exceeding 100KB with HTTP 413', async () => {
    const oversizedMessage = 'A'.repeat(105 * 1024); // 105 KB
    const { req, res, getStatusCode, getResponseData } = createMockReqRes({
      headers: { 'content-type': 'application/json', 'content-length': String(oversizedMessage.length) },
      body: {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+91 98765 43210',
        courseId: '24h-survival-challenge',
        message: oversizedMessage,
        consent: true
      }
    });

    await handler(req, res);
    assert.equal(getStatusCode(), 413);
    assert.equal(getResponseData().success, false);
    assert.ok(getResponseData().error.includes('Payload Too Large'));
    assert.equal(dispatchedEmails.length, 0);
  });

  // TEST 9: Missing SMTP Credentials Handling (No Secrets Leaked)
  await test('9. Handles missing SMTP credentials gracefully with HTTP 500 without leaking secrets', async () => {
    const savedUser = process.env.SMTP_USER;
    const savedPass = process.env.SMTP_PASS;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;

    const payload = {
      fullName: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 98765 43210',
      courseId: '24h-survival-challenge',
      message: 'Inquiring about equipment requirements.',
      consent: true
    };

    const { req, res, getStatusCode, getResponseData } = createMockReqRes({ body: payload });
    await handler(req, res);

    assert.equal(getStatusCode(), 500);
    assert.equal(getResponseData().success, false);
    assert.ok(!JSON.stringify(getResponseData()).includes('mock_app_password'));
    assert.ok(getResponseData().error.includes('Email service configuration is incomplete'));

    // Restore
    process.env.SMTP_USER = savedUser;
    process.env.SMTP_PASS = savedPass;
  });

  // TEST 10: SMTP Gateway Failure Handling (Generic User-Friendly Error)
  await test('10. Handles SMTP transport error with HTTP 502 without faking success or leaking error details', async () => {
    shouldFailSend = true; // Trigger mock SMTP auth error

    const payload = {
      fullName: 'Pooja Verma',
      email: 'pooja@example.com',
      phone: '+91 98765 43210',
      courseId: '48h-wilderness-challenge',
      message: 'Checking for upcoming monsoon training batches.',
      consent: true
    };

    const { req, res, getStatusCode, getResponseData } = createMockReqRes({ body: payload });
    await handler(req, res);

    assert.equal(getStatusCode(), 502);
    assert.equal(getResponseData().success, false);
    assert.ok(!JSON.stringify(getResponseData()).includes('535-5.7.8'));
    assert.ok(getResponseData().error.includes('Unable to deliver enquiry via mail gateway'));
    assert.notEqual(getResponseData().success, true, 'Must NEVER fake success if transport fails');
  });

  console.log('\n======================================================');
  console.log(`🎉 All ${passedTests}/${totalTests} Verification Tests Passed Successfully!`);
  console.log('======================================================\n');
}

runTestSuite().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
