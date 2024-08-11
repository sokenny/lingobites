import sendBite from "./sendBite.js";
import db from "../models/index.js";

async function sendNextBiteInQueue(user) {
  // look for the oldest bite with delivered_at null
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
    // throw limit reached error
    throw new Error("User has reached the limit of bites");
    // TODO-p1: For now lets recharge bites here
  }
}

export default sendNextBiteInQueue;
