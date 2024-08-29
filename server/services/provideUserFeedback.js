import db from "../models/index.js";
import { Op } from "sequelize";
import { openai } from "../app.js";

function getPrompt(translations) {
  return `Sos parte de un bot que envía oraciones cortas en [Español] para que los usuarios las traduzcan en [Italiano].

    Tu finalidad es que los usuarios mejoren su italiano a través de pequeños snacks de traducciones.

    A continuación, se muestran las últimas 15 traducciones que realizó el usuario:

    ${translations
      .map(
        (bite) => `Original: ${bite.original} Traduccion: ${bite.translation}`
      )
      .join("\n")}

    Basado en los errores que cometió el usuario en sus traducciones, generá un feedback para el usuario con tips para mejorar su italiano.
    `;
}

async function provideUserFeedback(userId) {
  // fetch up to last 15 bites
  const bites = await db.Bite.findAll({
    where: {
      user_id: userId,
      translated_at: {
        [Op.ne]: null,
      },
    },
    order: [["created_at", "DESC"]],
    limit: 15,
  });

  //   const openaiResponse = await openai.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     messages: [{ role: "user", content: getPrompt(n, user.bots[0]) }],
  //     temperature: 0.75,
  //   });

  const bitesArray = bites.map((bite) => ({
    original: bite.original,
    translated: bite.translated,
  }));

  const openaiResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: getPrompt(bitesArray) }],
    temperature: 0.75,
  });

  const content = openaiResponse.choices[0].message.content.trim();

  console.log("content!", content);

  return content;
}

export default provideUserFeedback;
