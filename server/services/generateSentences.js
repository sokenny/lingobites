import { openai } from "../app.js";
import lodash from "lodash";

const themes = [
  "amor",
  "aventura",
  "historia",
  "misterio",
  "viajes",
  "comida",
  "tecnología",
  "deportes",
  "música",
  "arte",
  "ciencia",
  "naturaleza",
  "educación",
  "salud",
  "moda",
  "cine",
  "libros",
  "fiestas",
  "trabajo",
  "hobbies",
];

// TODO-p2: Improve the way format of the response. The way it corrects and punctuates

function getPrompt(numberOfSentences, bot) {
  console.log("bot desde get prompt! ", bot);
  const theme = lodash.sample(themes); // Select a random theme
  return `Sos parte de un bot que envía oraciones cortas en [Español] sobre el tema [${theme}] para que los usuarios las traduzcan.

    Tu finalidad es que los usuarios mejoren su español a través de pequeños snacks de traducciones.

    Generame un array de strings JSON valido que contenga [${numberOfSentences}] oraciones en español de dificultad ${bot.level}/10 (siendo 10 la dificultad 'experto'), todas relacionadas con el tema [${theme}].

    Además de esa temática mencionada, es imortante que las oraciones se centren en el tema: ${bot.focus_topic} y no incluyan oraciones que no involucran la práctica de este tema.

    Tu respuesta va a ser parseada con JSON.parse() así que incluye única y exclusivamente los caracteres de JSON stringified, ejemplo:
    `;
}

async function generateSentences({ n, user }) {
  console.log("---generateSentences");
  try {
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: getPrompt(n, user.bots[0]) }],
      temperature: 0.75,
    });

    const content = openaiResponse.choices[0].message.content.trim();
    console.log("content: ", content);
    const contentInBrackets = content.match(/\[(?:[\s\S]*?)\]/)[0];
    console.log("contentInBrackets: ", contentInBrackets);
    const sentences = JSON.parse(contentInBrackets);

    return sentences;
  } catch (error) {
    console.error("Error parsing sentences: ", error);
    return [];
  }
}

export default generateSentences;
