const express = require("express");
const cors = require("cors");
const { sendMail } = require("./mailController");
const { scheduleBulkEmails } = require("./scheduler");
const app = express();
require("dotenv").config();
let port = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sampark.AI online!!");
});

app.post("/sendmail", sendMail);

// app.post("/send-mails", sendBulkMail);

app.post("/set-emails", async (req, res) => {
  const { scheduleTime, emails } = req.body;

  if (!scheduledTime || !emails || !Array.isArray(emails)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    await scheduleBulkEmails(scheduleTime, emails);
    res
      .status(200)
      .json({ success: true, message: "Emails scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling emails:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to schedule emails" });
  }
});

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
