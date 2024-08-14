import { openai, twilio } from "../app.js";
// import store from "../store.js";
import db from "../models/index.js";
import { client as redisClient } from "../lib/cache/index.js";
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
    
    '¡Buen intento! Aquí tienes la corrección: // Dependiendo de que tan correcta sea la traduccion, esta primer frase debe ser acorde. Por ejemplo si es perfecta, no hace falta que desarrolles mas. Si esta muy mal, tu intro puede ser mas como "Hay algunos errores..." Ya que no fue tan bueno el intento. 

    *Il mio libro preferito è una storia di avventure ambientata in mare.* // Asteriscos para que whatsapp lo muestre en negrita.

    "è una storia di avventure" para "es una historia de aventuras".
    "ambientata in mare" se usa para decir "ambientada en el mar", empleando "in" para "en" en este contexto.' Si bien "contestualizzata" no es del todo incorrecto, "ambientata" es la traducción más común y correcta en este caso.

    Como podes ver, tiene que ser bien breve tu respuesta. Y no solo digas que debería ir bien, sino que explica porque la que uso la persona no es la correcta o la "ideal".

    Responde en formato JSON valido con la siguiente estructura:
    {
    "answer": // tu respuesta en forma de string. Asegurate incluir line breaks para que sea legible,
    "score": // tu puntuación de 1 a 10, siendo 1 la peor y 10 la mejor,
    }

    Para que te des una idea de como puntuar, el siguiente ejemplo debiera ser un 9, ya que el error es mínimo

    Bot: Me gusta hacer fotografías de la vida cotidiana.
    Usuario: Mi piace fare fotografie della vita cuotidiana
    Traduccion correcta segun el bot: Mi piace fare fotografie della vita quotidiana.  

      `;
}

async function processUserTranslation(req) {
  console.log("---processUserTranslation");
  const userMessage = req.body.Body;
  const phone = req.body.From.replace("whatsapp:+", "");

  let user = await redisClient.get(`users:${phone}`);

  console.log("Lo encontramos del cache! ", user);
  user = JSON.parse(user);

  if (!user) {
    user = await db.User.findOne({
      where: { phone },
      include: [
        {
          model: db.Bot,
          as: "bots",
        },
      ],
    });

    console.log("User not found in cache, fetching from DB", user);

    // store["users"][phone] = user;
    await redisClient.set(`users:${phone}`, JSON.stringify(user.toJSON()));
  }

  // let inProgressBite = store["in-progress-bites"][user.id];
  let inProgressBite = await redisClient.get(`in-progress-bites:${user.id}`);

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

    inProgressBite = inProgressBite?.toJSON?.();

    // if still no in progress bite, we send the next bite in line
    if (!inProgressBite) {
      console.log("Still no in progress bites found");
      return sendNextBiteInQueue(user);
    }
  } else {
    inProgressBite = JSON.parse(inProgressBite);
  }

  await redisClient.set(
    `in-progress-bites:${user.id}`,
    JSON.stringify(inProgressBite)
  );

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
  updateBiteInBackground(inProgressBite.id, userMessage, user, response.score);

  return response.answer;
}

function updateBiteInBackground(biteId, translation, user, score) {
  // Run the update in the background
  setImmediate(async () => {
    try {
      // store["in-progress-bites"][user.id] = null;
      await redisClient.del(`in-progress-bites:${user.id}`);
      await db.Bite.update(
        {
          translation,
          translated_at: new Date(),
          score,
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
