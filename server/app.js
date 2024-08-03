// TODO-p1: Crear una db postgres

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import twilioClient from "twilio";
import OpenAI from "openai";
import generateSentences from "./services/generateSentences.js";
import store from "./store.js";
import { getDB, setDB } from "./mockupData.js";
import getUsersToContact from "./services/getUsersToContact.js";
import reachOutToUser from "./services/reachOutToUser.js";
import processUserTranslation from "./services/processUserTranslation.js";

dotenv.config();

// TWILIO INIT
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
export const twilio = twilioClient(accountSid, authToken);

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

// setInterval(sendMessageToAllUsers, 5000);

app.get("/", (req, res) => {
  res.send("Hello World! Check your console for automated messages.");
});

app.post("/whatsapp", (req, res) => {
  const incomingMsg = req.body;

  console.log("Incoming message: ", incomingMsg);

  // Respond to WhatsApp (optional)
  res.send(`
        <Response>
            <Message>
                Hello, thanks for your message:
            </Message>
        </Response>
    `);
});

app.get("/contact-users", async (req, res) => {
  console.log("Contacting users...");

  const mockupDb = getDB();
  const usersToContact = getUsersToContact();

  console.log("Users to contact: ", usersToContact);

  const sentences = await generateSentences();

  console.log("Sentences: ", sentences);

  const nowInMs = Date.now();

  for (const user of usersToContact) {
    const newBites = sentences.map((sentence) => ({
      user_id: user.id,
      original: sentence,
      translation: null,
      translated_at: null,
      batch_id: nowInMs,
    }));

    mockupDb.bites.push(newBites);
    setDB(mockupDb);

    await reachOutToUser(user, newBites[0]);
  }

  res.json(usersToContact);
});

app.post("/process-message", async (req, res) => {
  console.log("body: ", req.body);
  const llmResponse = await processUserTranslation(req);

  // Respond to WhatsApp (optional)
  res.send(`
        <Response>
            <Message>
                ${llmResponse}
            </Message>
        </Response>
    `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
