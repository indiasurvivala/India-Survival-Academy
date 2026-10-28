# India Survival Academy — Gmail SMTP & Nodemailer Setup Guide

This document outlines the architecture, environment variables, security safeguards, Google App Password generation, and deployment configuration for the **India Survival Academy** enquiry delivery system.

---

## 1. Architecture Overview (Single-Recipient Protocol)

The enquiry system follows a strict **single-recipient architecture**:

- **Target Recipient:** All submitted enquiry details are sent **exclusively to the academy admissions desk** at:
  ```
  INDIASURVIVALA@GMAIL.COM
  ```
- **Strictly No Confirmation Email to Visitor:** In strict accordance with academy policy, **no automated confirmation, receipt, or acknowledgment email is sent to the visitor**.
  - Prevents the mail server from being exploited as an open email relay or spam reflector.
  - Eliminates transactional bounce risks and preserves the sender reputation of the academy Gmail account.
  - Ensures all follow-up communications are handled personally and intentionally by academy counselors once official batch schedules, medical criteria, and venue permits are confirmed.
- **Direct Reply-To:** The outbound notification email sets the `replyTo` header directly to the applicant's validated email address. When counselors hit **"Reply"** in their Gmail inbox, it immediately drafts a response to the applicant.
- **Authenticated Sender:** Outbound emails are sent through the authenticated academy Gmail account (`SMTP_USER`) via Gmail SMTP using `nodemailer`. The applicant's email address is never used as the sender address.

---

## 2. System Components

| Component | File Location | Responsibility |
| :--- | :--- | :--- |
| **Frontend Form** | `src/components/forms/EnquiryForm.tsx` | Validates client inputs, captures spam honeypot, submits payload to `/api/enquiry`, retains inputs on failure, and renders genuine confirmation status. |
| **Serverless API** | `api/enquiry.ts` | Validates inputs server-side, detects spam bots, enforces 100KB payload limit, applies rate limits, and securely dispatches email via Nodemailer. |
| **Mail Gateway** | Gmail SMTP (`smtp.gmail.com`) | Delivers HTML and plain-text notifications directly to `INDIASURVIVALA@GMAIL.COM`. |
| **Vite Dev Server** | `vite.config.ts` | Intercepts `/api/enquiry` during local `npm run dev` to log submissions without throwing 404s. |

---

## 3. Environment Variables Configuration

Configure the following environment variables in your local environment file (`.env.local`) and in your **Vercel Project Settings** (`Settings` > `Environment Variables`):

| Variable Name | Required? | Recommended / Default Value | Description |
| :--- | :---: | :--- | :--- |
| `SMTP_HOST` | **Yes** | `smtp.gmail.com` | Google Gmail SMTP host address. |
| `SMTP_PORT` | **Yes** | `587` | Port `587` uses STARTTLS (`secure: false`). Alternatively, port `465` uses SSL (`secure: true`). |
| `SMTP_USER` | **Yes** | `INDIASURVIVALA@GMAIL.COM` | Academy Gmail address used for SMTP authentication and outbound dispatch. |
| `SMTP_PASS` | **Yes** | `xxxx xxxx xxxx xxxx` | 16-character Google-generated **App Password** (without spaces). **Never commit to GitHub or share in chat.** |
| `ENQUIRY_TO_EMAIL` | Optional | `INDIASURVIVALA@GMAIL.COM` | Dedicated destination inbox where all course enquiries are delivered. Defaults to `INDIASURVIVALA@GMAIL.COM`. |

> [!IMPORTANT]
> None of these variables begin with `VITE_`. They are accessible **strictly server-side** within the Vercel serverless function runtime (`process.env`) and are **never** bundled into client-side JavaScript or exposed to browser visitors.

---

## 4. Google Account & App Password Setup

Gmail does **not** allow standard account passwords for third-party SMTP authentication. You must generate a dedicated **Google App Password**.

### Step 1: Enable 2-Step Verification
1. Sign in to the academy Google Account at [https://myaccount.google.com](https://myaccount.google.com) (`INDIASURVIVALA@GMAIL.COM`).
2. In the left navigation panel, click **Security**.
3. Under *"How you sign in to Google"*, check **2-Step Verification**.
4. If not already active, follow the prompts to enable 2-Step Verification with your mobile number or authenticator app.

### Step 2: Generate a Google App Password
1. In the search bar at the top of your Google Account page, search for **"App passwords"** (or navigate directly to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
2. Under **App name**, enter a descriptive name such as:
   ```
   India Survival Academy Website
   ```
3. Click **Create**.
4. Google will display a 16-character passcode in a yellow box (e.g. `abcd efgh ijkl mnop`).
5. Copy this 16-character string. Remove any spaces when saving (e.g. `abcdefghijklmnop`).
6. Click **Done**.

> [!CAUTION]
> Treat the App Password like a private key. Never paste it into public chat, Git repositories, pull requests, or client-side code.

---

## 5. Local Setup & Testing

### Option A: Local Development Server (`npm run dev`)
When developing locally using `npm run dev`:
- Vite's built-in development middleware automatically intercepts `POST /api/enquiry`.
- Submissions are logged to your terminal console, returning a simulated HTTP 200 response.
- This allows full testing of the UI, loading states, validation error highlighting, and success screens without dispatching live emails.

### Option B: Running the Serverless API Locally (`vercel dev`)
To test real Gmail SMTP delivery on your local machine:
1. Ensure the Vercel CLI is installed:
   ```bash
   npm install -g vercel
   ```
2. In the `frontend/` directory, create a `.env.local` file (this file is ignored by `.gitignore`):
   ```ini
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=INDIASURVIVALA@GMAIL.COM
   SMTP_PASS=your_16_character_google_app_password
   ENQUIRY_TO_EMAIL=INDIASURVIVALA@GMAIL.COM
   ```
3. Run the local Vercel development server:
   ```bash
   vercel dev
   ```
4. Submit an enquiry through the web interface or test using cURL.

### Testing with cURL
```bash
curl -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Explorer",
    "email": "applicant@example.com",
    "phone": "+91 98765 43210",
    "courseId": "24h-survival-challenge",
    "preferredBatch": "Winter 2026",
    "message": "Testing Gmail SMTP dispatch directly to INDIASURVIVALA@GMAIL.COM.",
    "consent": true
  }'
```

**Expected Response (HTTP 200):**
```json
{
  "success": true,
  "message": "Your enquiry has been successfully delivered to the India Survival Academy admissions desk."
}
```

---

## 6. Production Deployment on Vercel

When deploying to Vercel:

1. Open your project in the [Vercel Dashboard](https://vercel.com).
2. Navigate to **Settings** &rarr; **Environment Variables**.
3. Add the following environment variables:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `INDIASURVIVALA@GMAIL.COM`
   - `SMTP_PASS`: `your_16_char_app_password`
   - `ENQUIRY_TO_EMAIL`: `INDIASURVIVALA@GMAIL.COM`
4. Apply these variables to **Production**, **Preview**, and **Development** environments.
5. Click **Save**.
6. Redeploy the application so the serverless function runtime picks up the new environment variables.

---

## 7. Security & Defensive Safeguards

1. **Server-Side Validation**:
   - Full Name: Trimmed length enforced between 2 and 100 characters.
   - Email: RFC-compliant syntax verification.
   - Phone: Normalized digit verification requiring 10 to 15 digits.
   - Message: Enforces 10 to 3,000 characters to prevent empty or buffer-overflow payloads.
   - Consent: Strict boolean validation (`true`).
   - HTML Entity Escaping: All user-submitted text is escaped before inserting into email templates to neutralize HTML/XSS injection.

2. **Spam Bot Protection (Honeypot)**:
   - The form renders an invisible input field (`website`).
   - Humans cannot see or interact with this field.
   - Automated spam bots fill all discovered inputs; if `website` contains any value, the API silently acknowledges with HTTP 200 without sending an email or alerting the bot.

3. **Payload Size Limit**:
   - The serverless handler checks request payload size and rejects payloads exceeding 100KB with HTTP 413 (`Payload Too Large`).

4. **HTTP Method Restrictions**:
   - Only `POST` and CORS preflight `OPTIONS` requests are accepted.
   - Any `GET`, `PUT`, or `DELETE` requests receive HTTP 405 (`Method Not Allowed`).

5. **Rate Limiting Note (Serverless Ephemeral Memory)**:
   - The serverless handler implements an in-memory sliding window rate limiter (max 5 requests per 10 minutes per IP address).
   - **Important Serverless Consideration:** In serverless architectures like Vercel, in-memory state is ephemeral and bound to individual container instances. Cold starts and concurrent lambdas do not share process memory.
   - **Production Recommendation:** If your deployment experiences high volumes of automated spam or targeted traffic, configure a shared persistent key-value store such as **Upstash Redis** (`@upstash/ratelimit`) or **Vercel KV** to enforce rate limits globally across all serverless instances.

---

## 8. Troubleshooting Gmail SMTP Authentication

| Symptom / Error | Probable Cause | Resolution |
| :--- | :--- | :--- |
| **`EAUTH` / Error 535: 5.7.8 Username and Password not accepted** | Using standard Gmail password instead of an App Password, or typo in App Password. | Generate a fresh 16-character App Password at [Google Account App Passwords](https://myaccount.google.com/apppasswords). Ensure 2-Step Verification is active and remove any spaces. |
| **`ESOCKETTIMEDOUT` / Connection timeout** | Port blocked by host or network firewall. Port 25 is blocked by most cloud providers. | Ensure you are using `SMTP_PORT=587` with STARTTLS or `SMTP_PORT=465` with SSL. |
| **Self-signed certificate error / TLS handshake failure** | Port and `secure` flag mismatch. | For Port 587, `secure` must be `false` (with STARTTLS upgrade). For Port 465, `secure` must be `true`. The API code handles this automatically based on `SMTP_PORT`. |
| **Email received in Spam / Promotions** | First-time email delivery from a new SMTP connection. | Open Gmail, find the message, and click **"Report not spam"** or create a filter to always deliver emails with subject `[New Academy Enquiry]` to Primary. |
| **Applicant receives confirmation email** | Misconfiguration or secondary trigger. | The codebase strictly enforces a single dispatch to `INDIASURVIVALA@GMAIL.COM`. Verify no external third-party autoresponder or forwarder is active in the Gmail account settings. |

---

## 9. Verification Checklist

- [x] Email sent **only** to `INDIASURVIVALA@GMAIL.COM`.
- [x] **No** confirmation email or auto-response dispatched to visitor.
- [x] Outbound sender authenticated via `SMTP_USER` and Google App Password (`SMTP_PASS`).
- [x] `replyTo` set to applicant's validated email address for one-click response.
- [x] Client and server validation synchronized.
- [x] Invisible honeypot spam filter in place.
- [x] Request payload size limits enforced (100KB limit).
- [x] Rate limiting active with serverless ephemeral memory documented.
- [x] Zero API keys or secrets exposed in frontend bundles or logs.
- [x] Automated test suite verifying mocked SMTP dispatch without sending real emails.
