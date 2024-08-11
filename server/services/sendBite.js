import { twilio } from "../app.js";
import db from "../models/index.js";
import store from "../store.js";

async function sendBite(user, bite) {
  console.log("Reaching out to user: ", user, bite);
  await twilio.messages
    .create({
      body: bite.original,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+" + user.phone,
    })
    .then(async (message) => {
      store["in-progress-bites"][user.id] = bite;
      await db.Bite.update(
        {
          delivered_at: new Date(),
        },
        {
          where: {
            id: bite.id,
          },
        }
      );
      console.log("bite deliverd: ", message.sid);
    });
}
export default sendBite;
