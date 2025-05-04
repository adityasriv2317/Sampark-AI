const nodemailer = require('nodemailer');

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // email address
    pass: process.env.EMAIL_PASS  // email app password (or normal password if using other services)
  }
});

const sendbulkEmails = (emails) => {
  emails.forEach(({ recipient, subject, body }) => {
    const mailOptions = {
      from: `"Sampark AI" <${process.env.EMAIL_USER}>`,
      to: recipient.Email,
      subject: subject,
      html: body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(`Failed to send email to ${recipient.Email}:`, err);
      } else {
        console.log(`Email sent to ${recipient.Email}:`, info.response);
      }
    });
  });
}

module.exports = { sendbulkEmails };
