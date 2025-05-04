// mailController.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields: 'to', 'subject', or 'text'" });
  }

  // Configure transporter (Gmail example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((err, success) => {
    if (err) {
      console.error('Email server connection failed:', err);
    } else {
      console.log('Email server is ready to send messages');
    }
  });

  const mailOptions = {
    from: `"Sampark.AI" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('SendMail Error:', error);
    res.status(500).json({ error: 'Failed to send email',  });
    res.status(500).json(error);
  }
};

module.exports = { sendMail };
