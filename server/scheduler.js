const { sendBulkMail } = require("./bulkController");


const scheduleBulkEmails = (scheduledTime, emails) => {
  const sendTime = new Date(scheduledTime).getTime();
  const currentTime = Date.now();
  const delay = sendTime - currentTime;

  if (delay <= 0) {
    console.log("Scheduled time is in the past. Sending immediately.");
    return Promise.all(emails.map(sendBulkMail));
  }

  console.log(`Emails scheduled in ${Math.round(delay / 1000)} seconds...`);

  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const results = await Promise.all(emails.map(sendBulkMail));
        resolve(results);
      } catch (err) {
        console.error("Failed to send one or more emails:", err);
        resolve(err);
      }
    }, delay);
  });
};

module.exports = { scheduleBulkEmails };
