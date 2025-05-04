const nodemailer = require('nodemailer');
require('dotenv').config();

const sendBulkMail = async (emailData) => {
  const { recipient, subject, body } = emailData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Sampark AI" <${process.env.EMAIL_USER}>`,
    to: recipient.Email,
    subject,
    html: body
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendBulkMail };
