import { openai, twilio } from "../app.js";
import store from "../store.js";
import db from "../models/index.js";
import sendNextBiteInQueue from "./sendNextBiteInQueue.js";

function getPrompt(original, translation) {
  return `
    Tu trabajo es corregir el siguiente intento de traducción de español a italiano.
    Oración original: "${original}".
    Oración traducida: "${translation}".
    Tu respuesta debe primero comentar si la traducción es correcta o incorrecta de forma amistosa. 
    Luego proveer la traducción correcta.
    Y por ultimo señalar donde se encuentran los errores con algun tip si es posible.
    Si el intento de traducción parece ser un mensaje de otro índole, contesta con que no entendiste la traducción y volve a solicitarla.
    Acá tenes un ejemplo de como podría ser tu respuesta:
    
    '¡Buen intento! Aquí tienes la corrección:

    Il mio libro preferito è una storia di avventure ambientata in mare.

    "è una storia di avventure" para "es una historia de aventuras".
    "ambientata in mare" se usa para decir "ambientada en el mar", empleando "in" para "en" en este contexto.'

    Como podes ver, tiene que ser bien breve tu respuesta.

    Responde en formato JSON valido con la siguiente estructura:
    {
    "answer": // tu respuesta en forma de string. Asegurate incluir line breaks para que sea legible,
    "score": // tu puntuación de 1 a 10, siendo 1 la peor y 10 la mejor,
    }
      `;
}

// TODO-p1: Guardar el score en el bite

async function processUserTranslation(req) {
  const userMessage = req.body.Body;
  const phone = req.body.From.replace("whatsapp:+", "");

  let user = store["users"][phone];

  if (!user) {
    user = await db.User.findOne({
      where: { phone },
    });

    store["users"][phone] = user;
  }

  let inProgressBite = store["in-progress-bites"][user.id];

  if (!inProgressBite) {
    console.log("No in progress bite found for user", user.id);
    inProgressBite = await db.Bite.findOne({
      where: {
        user_id: user.id,
        delivered_at: {
          [db.Sequelize.Op.ne]: null,
        },
        translated_at: null,
      },
      order: [["delivered_at", "DESC"]],
    });

    // if still no in progress bite, we send the next bite in line
    if (!inProgressBite) {
      console.log("Still no in progress bites found");
      return sendNextBiteInQueue(user);
    }
  }

  store["in-progress-bites"][user.id] = inProgressBite;

  const openaiResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: getPrompt(inProgressBite.original, userMessage),
      },
    ],
    temperature: 0.3,
  });

  const content = openaiResponse.choices[0].message.content.trim();

  const response = JSON.parse(content);
  console.log("Response: ", response);

  // Update the bite in the background without waiting for the operation to complete
  updateBiteInBackground(inProgressBite.id, userMessage, user);

  return response.answer;
}

function updateBiteInBackground(biteId, translation, user) {
  // Run the update in the background
  setImmediate(async () => {
    try {
      store["in-progress-bites"][user.id] = null;
      await db.Bite.update(
        {
          translation,
          translated_at: new Date(),
        },
        {
          where: { id: biteId },
        }
      );
      console.log(`Bite ${biteId} updated successfully.`);
      sendNextBiteInQueue(user);
    } catch (error) {
      console.error(`Failed to update bite ${biteId}:`, error);
    }
  });
}

export default processUserTranslation;
