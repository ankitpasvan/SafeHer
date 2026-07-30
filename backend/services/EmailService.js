// services/emailService.js
const nodemailer = require("nodemailer");

// Create a reusable "transporter" -- the object that actually connects to
// an email provider (Gmail, Outlook, or any SMTP service) and sends mail.
// Credentials come from .env so they're never hardcoded.
const transporter = nodemailer.createTransport({
  service: "gmail", // using Gmail SMTP; swap to a custom host if using another provider
  auth: {
    user: process.env.EMAIL_USER, // your sending email address
    pass: process.env.EMAIL_PASS, // Gmail App Password (NOT your normal password)
  },
});

// Generic low-level function -- every other function in this file calls this one
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"SafeHer Alerts" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}, messageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};

// Sends a welcome email right after registration
// Called from authController.js -> registerUser
const sendWelcomeEmail = async (toEmail, name) => {
  const subject = "Welcome to SafeHer";
  const html = `
    <h2>Hi ${name},</h2>
    <p>Welcome to SafeHer! Your account has been created successfully.</p>
    <p>Add your emergency contacts now so you're protected before you need it.</p>
  `;
  return sendEmail(toEmail, subject, html);
};

// Sends SOS emergency alert emails to all contacts that have an email saved
// Called from sosController.js -> triggerSOS, alongside the existing SMS alert
const sendSOSAlertEmail = async (contacts, userName, lat, lng) => {
  const mapLink = `https://maps.google.com/?q=${lat},${lng}`;
  const subject = `EMERGENCY: ${userName} needs help`;
  const html = `
    <h2 style="color:red;">Emergency Alert</h2>
    <p><strong>${userName}</strong> has triggered an SOS alert and may need immediate help.</p>
    <p>Their live location: <a href="${mapLink}">${mapLink}</a></p>
    <p>Please try contacting them or reach local authorities if needed.</p>
  `;

  // Only email contacts that actually have an email saved
  const contactsWithEmail = contacts.filter((c) => c.email);

  const results = await Promise.all(
    contactsWithEmail.map((contact) => sendEmail(contact.email, subject, html)),
  );

  return results;
};

// Sends a confirmation email after an incident report is submitted
// Called from incidentController.js -> reportIncident (optional, good UX touch)
const sendIncidentConfirmationEmail = async (toEmail, description) => {
  const subject = "Your incident report was received";
  const html = `
    <h2>Thank you for reporting</h2>
    <p>We received your report: "${description}"</p>
    <p>Our team will review it shortly. Reporting unsafe areas helps keep the community safer.</p>
  `;
  return sendEmail(toEmail, subject, html);
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendSOSAlertEmail,
  sendIncidentConfirmationEmail,
};
