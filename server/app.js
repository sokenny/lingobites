import express from "express";
import store from "./store.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import twilioClient from "twilio";
import OpenAI from "openai";
import processUserTranslation from "./services/processUserTranslation.js";
import sendBite from "./services/sendBite.js";
import db from "./models/index.js";
import generateBites from "./services/generateBites.js";
import provideUserFeedback from "./services/provideUserFeedback.js";

dotenv.config();

// TWILIO INIT
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
export const twilio = twilioClient(accountSid, authToken);

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;

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
      include: [
        { model: db.Bite, as: "bites" },

        {
          model: db.Bot,
          as: "bots",
        },
      ],
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

    const bites = await generateBites({ user, numberOfBites: 10 });

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

app.post("/provide-user-feedback/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const feedback = await provideUserFeedback(userId);

    res.json({ feedback });
  } catch (error) {
    console.error("Error providing feedback: ", error);

    res.status(500).json({ message: "An error occurred providing feedback" });
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

// TODO-p1: Create endpoint that returns chart data / stats for last X bites

app.get("/test", async (req, res) => {
  const test = await db.User.create({
    email: "santidrift@gmail.com",
    phone: "+5491157504166",
  });

  res.json(test);
});

app.post("/public/authenticate", async (req, res) => {
  try {
    console.log("REQ BODY: ", req.body);
    const { email, phone } = req.body;

    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(401).json({ message: "User already exists" });
    }

    await db.User.create({
      email,
      phone,
    });

    res.json({ message: "User created" });
  } catch (error) {
    console.error("Error authenticating user: ", error);

    res.status(500).json({ message: "An error occurred authenticating user" });
  }
});

app.post("/onboard/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const data = req.body;
    const user = await db.User.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await db.UserOnboarding.create({
      user_id: user.id,
      email: user.email,
      ...data,
    });

    res.json({ message: "User onboarded" });
  } catch (error) {
    console.error("Error onboarding user: ", error);

    res.status(500).json({ message: "An error occurred onboarding user" });
  }
});

app.get("/user/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const user = await db.User.findOne({
      where: {
        email: userEmail,
      },
      include: [
        {
          model: db.UserOnboarding,
          as: "onboarding",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user: ", error);

    res.status(500).json({ message: "An error occurred getting user" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
