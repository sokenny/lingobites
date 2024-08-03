import { openai, twilio } from "../app.js";
import { getDB, setDB } from "../mockupData.js";
import store from "../store.js";

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
      `;
}

async function processUserTranslation(req) {
  const message = req.body.Body;
  const phone = req.body.From.replace("whatsapp:+", "");

  // get user from phone number
  const db = getDB();
  const user = db.users.find((user) => user.phone === phone);

  // get in progress bite for user
  const inProgressBite = store["in-progress-bites"][user.id];

  const openaiResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: getPrompt(inProgressBite.original, message) },
    ],
    temperature: 0.5,
  });

  const content = openaiResponse.choices[0].message.content.trim();

  console.log("Content: ", content);

  console.log("User: ", user);
  console.log("Storw: ", store);
  console.log("In progress bite: ", inProgressBite);

  return content;
}

export default processUserTranslation;
