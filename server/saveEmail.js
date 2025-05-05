// services/saveEmailSchedule.js
const EmailSchedule = require("./models/EmailSchedule");

const saveEmailSchedule = async ({ scheduledTime, emails }) => {
  try {
    const schedule = new EmailSchedule({ scheduledTime, emails });
    const saved = await schedule.save();
    return { success: true, data: saved };
  } catch (error) {
    console.error("Failed to save email schedule:", error);
    return { success: false, error: "Database save failed." };
  }
};

module.exports = saveEmailSchedule;