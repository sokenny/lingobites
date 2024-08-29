import sendBite from "./sendBite.js";
import db from "../models/index.js";
import generateBites from "./generateBites.js";

async function sendNextBiteInQueue(user) {
  console.log("---sendNextBiteInQueue");
  const bite = await db.Bite.findOne({
    where: {
      user_id: user.id,
      translated_at: null,
      delivered_at: null,
    },
    order: [["created_at", "ASC"]],
  });

  if (bite) {
    return sendBite(user, bite);
  } else {
    console.log("No bites in queue, generating new bites");
    const bites = await generateBites({ user, numberOfBites: 10 });
    return sendBite(user, bites[0]);
  }
}

export default sendNextBiteInQueue;
