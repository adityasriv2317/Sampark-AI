// models/EmailSchedule.js
const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  Email: { type: String, required: true },
  Achievement: { type: String },
  Organization: { type: String },
});

const emailSchema = new mongoose.Schema({
  recipient: { type: recipientSchema, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
});

const emailScheduleSchema = new mongoose.Schema({
  scheduledTime: { type: Date, required: true },
  emails: { type: [emailSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailSchedule', emailScheduleSchema);
