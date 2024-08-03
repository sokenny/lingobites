import { twilio } from "../app.js";
import mockupData from "../mockupData.js";
import store from "../store.js";

async function reachOutToUser(user, bite) {
  console.log("Reaching out to user: ", user, bite);
  await twilio.messages
    .create({
      body: bite.original,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+" + user.phone,
    })
    .then((message) => {
      store["in-progress-bites"][user.id] = bite;
      console.log(message.sid);
    });
}
export default reachOutToUser;
