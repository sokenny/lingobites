import { twilio } from "../app";
import db from "../mockupData";

function processMessage(user) {
  console.log("Run! ", user.phone);
  const now = new Date();

  twilio.messages
    .create({
      body: "Ni idea papurri",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+" + user.phone,
    })
    .then((message) => {
      console.log(message.sid);
      recordBite(user, message);
    });
}

function recordBite(user, message) {
  const now = new Date().toISOString();
  db.bites.push({
    user_id: user.id,
    message_sid: message.sid,
    sent_at: now,
  });
  console.log("Bite recorded for user", user.email);
}

function sendMessageToAllUsers() {
  db.users.forEach((user) => {
    processMessage(user);
  });
}

export default sendMessageToAllUsers;
