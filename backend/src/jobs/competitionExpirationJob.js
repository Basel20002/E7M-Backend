const cron = require("node-cron");

const {
  releaseExpiredCompetitionSlots,
} = require("../controllers/playerCompetitionController");

let isRunning = false;

const runCompetitionExpiration = async () => {
  if (isRunning) {
    return;
  }

  isRunning = true;

  try {
    if (typeof releaseExpiredCompetitionSlots === "function") {
      await releaseExpiredCompetitionSlots();
    } else {
      console.warn("⚠️ releaseExpiredCompetitionSlots is not defined or exported properly.");
    }
  } catch (error) {
    console.error(
      "❌ Competition expiration job error details:",
      error
    );
  } finally {
    isRunning = false;
  }
};

const startCompetitionExpirationJob = () => {
  // Run once when the server starts
  runCompetitionExpiration();

  // Then run every 5 minutes
  cron.schedule("*/5 * * * *", runCompetitionExpiration);

  console.log("⏰ Competition expiration job started");
};

module.exports = {
  startCompetitionExpirationJob,
};
