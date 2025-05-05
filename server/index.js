const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { sendMail } = require("./mailController");
const { sendbulkEmails } = require("./bulkController");
const connectDB = require("./config/mongo");
const saveEmailSchedule = require("./saveEmail");
const app = express();
require("dotenv").config();
let port = 3000;

app.use(cors());
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sampark.AI online!!");
});

app.post("/sendmail", sendMail);

app.post("/set-emails", async (req, res) => {
  const { scheduledTime, emails } = req.body;

  if (!scheduledTime || !emails || emails.length === 0) {
    return res.status(400).json({
      error: "Invalid data. Ensure you provide scheduledTime and emails.",
    });
  }

  const cronExpression = convertToCronExpression(scheduledTime);

  const result = await saveEmailSchedule({ scheduledTime, emails });

  if (!result.success) {
    return res.status(500).json({ error: result.error });
  }

  cron.schedule(
    cronExpression,
    () => {
      console.log("Running scheduled email task...");
      sendbulkEmails(emails);
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );

  res
    .status(200)
    .json({ message: "Email scheduling initiated.", scheduledTime });
  console.log("Scheduled Emails");
});

app.get("/all-mails", async (req, res) => {
  try {
    const EmailSchedule = require("./models/EmailSchedule");
    const allMails = await EmailSchedule.find().sort({ createdAt: -1 });
    res.status(200).json(allMails);
  } catch (error) {
    console.error("Error fetching all mails:", error);
    res.status(500).json({ error: "Failed to fetch emails." });
  }
});

// Function to convert scheduledTime (ISO format) to cron expression
const convertToCronExpression = (scheduledTime) => {
  const scheduledDate = new Date(scheduledTime);

  const minute = scheduledDate.getMinutes();
  const hour = scheduledDate.getHours();
  const day = scheduledDate.getDate();
  const month = scheduledDate.getMonth() + 1;
  const weekday = scheduledDate.getDay();

  return `${minute} ${hour} ${day} ${month} *`;
};

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Sampark.AI live on URL_ADDRESS:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
