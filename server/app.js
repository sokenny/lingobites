import { v4 as uuidv4 } from "uuid";
import express from "express";
import store from "./store.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import twilioClient from "twilio";
import OpenAI from "openai";
import generateSentences from "./services/generateSentences.js";
import processUserTranslation from "./services/processUserTranslation.js";
import sendBite from "./services/sendBite.js";
import db from "./models/index.js";

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

app.post("/onboard-user/:userId", async (req, res) => {
  const userId = req.params.userId;

  const transaction = await db.sequelize.transaction();

  try {
    const user = await db.User.findOne({
      where: { id: userId },
      include: [{ model: db.Bite, as: "bites" }],
    });

    if (user && user.bites.length > 0) {
      return res.status(400).json({
        message: "User already has bites created",
        user,
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const sentences = await generateSentences();

    console.log("Sentences: ", sentences);

    const batchId = uuidv4();

    const newBites = sentences.map((sentence) => ({
      user_id: user.id,
      original: sentence,
      translation: null,
      translated_at: null,
      batch_id: batchId,
    }));

    const bites = await db.Bite.bulkCreate(newBites, { transaction }); // Include transaction in the bulkCreate

    await sendBite(user, bites[0]);

    await transaction.commit(); // Commit the transaction if everything is successful

    res.json(user);
  } catch (error) {
    await transaction.rollback(); // Rollback transaction if any error occurs
    console.error("Error during onboarding:", error);
    res.status(500).json({ message: "An error occurred during onboarding" });
  }
});

app.post("/reach-out-to-users", async (req, res) => {
  try {
    const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);

    const users = await db.User.findAll({
      include: [
        {
          model: db.Bite,
          as: "bites",
          where: {
            translated_at: null,
            delivered_at: {
              [db.Sequelize.Op.lt]: fourHoursAgo,
            },
          },
        },
      ],
    });

    console.log("Users to contact: ", users);

    if (users.length === 0) {
      return res.json({ message: "No users to contact" });
    }

    for (const user of users) {
      store.users[user.phone] = user;
      await sendBite(user, user.bites[0]);
    }

    res.json(users);
  } catch (error) {
    console.error("Error reaching out to users: ", error);

    res
      .status(500)
      .json({ message: "An error occurred reaching out to users" });
  }
});

app.post("/process-message", async (req, res) => {
  try {
    console.log("body: ", req.body);
    const llmResponse = await processUserTranslation(req);

    if (llmResponse) {
      res.send(`
            <Response>
                <Message>
                    ${llmResponse}
                </Message>
            </Response>
        `);
    }

    res.status(200).send();
  } catch (error) {
    if (error.message === "User has reached the limit of bites") {
      res.send(`
            <Response>
                <Message>
                    Alcanzaste el límite de mensajes por hoy. 
                </Message>
            </Response>
        `);
    } else {
      console.error("Error processing message: ", error);
      res.status(500).send();
    }
  }
});

app.get("/test", async (req, res) => {
  const test = await db.User.create({
    email: "santidrift@gmail.com",
    phone: "+5491157504166",
  });

  res.json(test);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
