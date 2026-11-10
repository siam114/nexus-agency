import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  ipAddress?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const SMTP_USER = process.env.SMTP_USER || "smsiam987@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS || "mfgrwhrurammdmmy";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "smsiam987@gmail.com";
const AGENCY_NAME = process.env.AGENCY_NAME || "NexusAgency";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

/**
 * Sends both the admin notification (to SM SIAM) and the client auto-confirmation (to the person who filled the form)
 */
export async function sendInquiryEmails(data: ContactEmailPayload): Promise<{
  adminSent: boolean;
  clientSent: boolean;
}> {
  const transporter = createTransporter();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  // 1. Admin Notification to SM SIAM
  const adminSubject = `🚨 New Inquiry: ${data.name} — ${data.service || "General Inquiry"}`;
  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 32px 16px; color: #f1f5f9; }
    .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
    .header { background: linear-gradient(135deg, #1d4ed8, #2563eb); padding: 28px 32px; text-align: left; }
    .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; color: #bfdbfe; font-size: 13px; }
    .content { padding: 32px; }
    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; border-radius: 9999px; background-color: #1e3a8a; color: #93c5fd; margin-bottom: 20px; }
    .field-group { margin-bottom: 18px; border-bottom: 1px solid #1f2937; padding-bottom: 14px; }
    .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #ffffff; font-weight: 600; }
    .field-value a { color: #60a5fa; text-decoration: none; }
    .message-box { background-color: #0d121f; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 18px; margin: 20px 0; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .actions { text-align: center; margin-top: 28px; }
    .reply-btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; padding: 12px 28px; border-radius: 9999px; font-size: 14px; font-weight: 700; text-decoration: none; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4); }
    .footer { background-color: #0d121f; padding: 20px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #1f2937; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${AGENCY_NAME} — New Client Inquiry</h1>
      <p>Direct message received through the agency website contact form</p>
    </div>

    <div class="content">
      <span class="badge">Live Notification</span>

      <div class="field-group">
        <div class="field-label">Client Name</div>
        <div class="field-value">${escapeHtml(data.name)}</div>
      </div>

      <div class="field-group">
        <div class="field-label">Client Email Address</div>
        <div class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>

      <div class="field-group">
        <div class="field-label">Selected Service</div>
        <div class="field-value" style="color: #60a5fa;">${escapeHtml(data.service || "General Inquiry")}</div>
      </div>

      ${
        data.company
          ? `
      <div class="field-group">
        <div class="field-label">Company / Brand</div>
        <div class="field-value">${escapeHtml(data.company)}</div>
      </div>
      `
          : ""
      }

      <div class="field-group">
        <div class="field-label">Submission Time (Dhaka)</div>
        <div class="field-value" style="font-size: 13px; color: #94a3b8;">${formattedDate}</div>
      </div>

      <div class="field-label" style="margin-top: 20px;">Client Message / Project Goals</div>
      <div class="message-box">${escapeHtml(data.message)}</div>

      <div class="actions">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your ${encodeURIComponent(data.service || "Project")} Inquiry — ${AGENCY_NAME}" class="reply-btn">
          Directly Reply to ${escapeHtml(data.name)} &rarr;
        </a>
      </div>
    </div>

    <div class="footer">
      NexusAgency Admin Notification &bull; Delivered to ${NOTIFICATION_EMAIL}<br>
      Client IP: ${data.ipAddress || "Unknown"}
    </div>
  </div>
</body>
</html>
`;

  // 2. Client Auto-confirmation (matching user's screenshot)
  const clientSubject = `We have received your project inquiry — ${AGENCY_NAME}`;
  const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 32px 16px; color: #f1f5f9; }
    .container { max-width: 580px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 28px 32px; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; }
    .content { padding: 32px; font-size: 14px; line-height: 1.7; color: #cbd5e1; }
    .card { background-color: #0d121f; border: 1px solid #1f2937; border-radius: 10px; padding: 18px; margin: 20px 0; }
    .highlight { color: #60a5fa; font-weight: 600; }
    .footer { background-color: #0d121f; padding: 18px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #1f2937; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${AGENCY_NAME}</h1>
    </div>
    <div class="content">
      <p>Hello <strong style="color: #ffffff;">${escapeHtml(data.name)}</strong>,</p>
      <p>Thank you for reaching out to <strong>NexusAgency</strong>. We have successfully received your inquiry regarding <span class="highlight">${escapeHtml(data.service || "our services")}</span>.</p>
      
      <div class="card">
        <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px; font-weight: 700;">Summary of Your Message:</div>
        <div style="color: #e2e8f0; font-size: 13px; font-style: italic;">"${escapeHtml(data.message)}"</div>
      </div>

      <p><strong>SM SIAM</strong> and our engineering team are currently reviewing your project scope and will respond within <strong>24 business hours</strong> with next steps or a discovery schedule.</p>
      <p>In the meantime, feel free to reply directly to this email if you have any additional materials, design files, or requirements to share.</p>
      
      <p style="margin-top: 24px;">Best regards,<br><strong style="color: #ffffff;">SM SIAM</strong><br><span style="font-size: 12px; color: #94a3b8;">Founder &amp; Lead Developer &bull; NexusAgency</span></p>
    </div>
    <div class="footer">
      NexusAgency &bull; High-Impact Digital Engineering &bull; Dhaka, Bangladesh
    </div>
  </div>
</body>
</html>
`;

  let adminSent = false;
  let clientSent = false;

  // Send admin notification
  try {
    await transporter.sendMail({
      from: `"${AGENCY_NAME}" <${SMTP_USER}>`,
      to: NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: adminSubject,
      html: adminHtml,
    });
    adminSent = true;
  } catch (err) {
    console.error("Failed to send admin notification:", err);
  }

  // Send client confirmation
  try {
    if (data.email) {
      await transporter.sendMail({
        from: `"${AGENCY_NAME} Support" <${SMTP_USER}>`,
        to: data.email,
        subject: clientSubject,
        html: clientHtml,
      });
      clientSent = true;
    }
  } catch (err) {
    console.error("Failed to send client confirmation:", err);
  }

  return { adminSent, clientSent };
}
