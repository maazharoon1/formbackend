const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const contactRecipient = process.env.CONTACT_RECIPIENT || smtpUser;

if (!smtpHost || !smtpUser || !smtpPass) {
  console.warn('SMTP configuration is missing. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env');
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const sendFormEmail = async ({ name, email, subject, message }) => {
  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error('Missing SMTP configuration');
  }

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2>New contact form message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 1rem; background: #f4f5f7; border-radius: 12px; color: #1f2937; white-space: pre-wrap;">${message}</div>
    </div>
  `;

  const mailOptions = {
    from: `Contact Form <${smtpUser}>`,
    to: contactRecipient,
    subject: `Website contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    html: htmlMessage,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendFormEmail };