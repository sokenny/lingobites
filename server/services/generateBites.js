import { v4 as uuidv4 } from "uuid";
import generateSentences from "./generateSentences.js";
import db from "../models/index.js";

async function generateBites({ user, numberOfBites = 10, transaction }) {
  console.log("---generateBites");
  try {
    const sentences = await generateSentences({ n: numberOfBites, user });

    console.log("Sentences: ", sentences);

    const batchId = uuidv4();

    const newBites = sentences.map((sentence) => ({
      user_id: user.id,
      original: sentence,
      translation: null,
      translated_at: null,
      batch_id: batchId,
    }));

    const options = {};
    if (transaction) {
      options.transaction = transaction;
    }
    const bites = await db.Bite.bulkCreate(newBites, options);

    return bites;
  } catch (error) {
    console.log("Error generating bites: ", error);
    throw new Error("Error generating bites: ", error);
  }
}

export default generateBites;
