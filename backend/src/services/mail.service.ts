import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

interface ContactInquiryEmailPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  ipAddress?: string;
}

class MailService {
  private transporter: Transporter | null = null;

  constructor() {
    this.initTransporter();
  }

  private initTransporter() {
    if (!env.SMTP_PASS) {
      logger.warn(
        "MailService: SMTP_PASS is not configured. Email dispatch will be simulated in logs."
      );
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE, // true for port 465, false for 587
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });

      logger.info(
        `MailService initialized with SMTP host ${env.SMTP_HOST}:${env.SMTP_PORT} (${env.SMTP_USER})`
      );
    } catch (error) {
      logger.error("Failed to initialize nodemailer transporter", error);
    }
  }

  /**
   * Sends an instant notification to SM SIAM (smsiam987@gmail.com)
   * with the client's inquiry details and reply-to preconfigured.
   */
  async sendContactNotification(data: ContactInquiryEmailPayload): Promise<boolean> {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    const subject = `🚨 New Inquiry: ${data.name} — ${data.service || "General Inquiry"}`;

    const htmlContent = `
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
      <h1>${env.AGENCY_NAME} — New Client Inquiry</h1>
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
        <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your ${encodeURIComponent(data.service || "Project")} Inquiry — NexusAgency" class="reply-btn">
          Directly Reply to ${escapeHtml(data.name)} &rarr;
        </a>
      </div>
    </div>

    <div class="footer">
      NexusAgency Admin Notification &bull; Delivered to ${env.NOTIFICATION_EMAIL}<br>
      Client IP: ${data.ipAddress || "Unknown"}
    </div>
  </div>
</body>
</html>
`;

    if (!this.transporter) {
      logger.info(
        `[DRY RUN - SMTP NOT CONFIGURED] Would send email to ${env.NOTIFICATION_EMAIL} regarding ${data.name}`
      );
      return false;
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"${env.AGENCY_NAME}" <${env.SMTP_USER}>`,
        to: env.NOTIFICATION_EMAIL,
        replyTo: data.email, // Hit reply in Gmail to reply directly to client!
        subject,
        html: htmlContent,
      });

      logger.info(`Contact notification delivered: MessageID ${info.messageId}`);
      return true;
    } catch (error) {
      logger.error("Failed to send contact notification email", error);
      return false;
    }
  }

  /**
   * Sends a polite auto-confirmation receipt to the client.
   */
  async sendClientConfirmation(data: ContactInquiryEmailPayload): Promise<boolean> {
    if (!this.transporter || !data.email) return false;

    const subject = `We have received your project inquiry — ${env.AGENCY_NAME}`;
    const htmlContent = `
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
      <h1>${env.AGENCY_NAME}</h1>
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

    try {
      const info = await this.transporter.sendMail({
        from: `"${env.AGENCY_NAME} Support" <${env.SMTP_USER}>`,
        to: data.email,
        subject,
        html: htmlContent,
      });

      logger.info(`Client auto-confirmation sent: MessageID ${info.messageId}`);
      return true;
    } catch (error) {
      logger.error("Failed to send client auto-confirmation email", error);
      return false;
    }
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const mailService = new MailService();
