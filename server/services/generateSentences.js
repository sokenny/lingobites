import { openai } from "../app.js";

function getPrompt() {
  return `Sos parte de un bot que envía oraciones cortas en [Español] para que los usuarios las traduzcan.

    Tu finalidad es que los usuarios mejoren su español a través de pequeños snacks de traducciones.

    Generame un array de strings JSON valid que contenga [5] oraciones en español de dificultad intermedia.
    Tu respuesta va a ser parseada con JSON.parse() así que incluí única y exclusivamente los caracteres de JSON stringified, ejemplo:
    `;
}

async function generateSentences() {
  try {
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: getPrompt() }],
      temperature: 0.5,
    });

    const content = openaiResponse.choices[0].message.content.trim();
    const contentInBrackets = content.match(/\[.*\]/)[0];
    const sentences = JSON.parse(contentInBrackets);

    return sentences;
  } catch (error) {
    console.error("Error parsing sentences: ", error);
    return [];
  }
}

export default generateSentences;
