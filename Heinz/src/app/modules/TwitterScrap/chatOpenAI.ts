import OpenAI from "openai";
import * as dotenv from "dotenv";
import { json } from "stream/consumers";

dotenv.config({
  path: `${__dirname}/.env`
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function analisarComentarios(listaComentarios: Array<string>) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
                sem nenhum texto adicional, somente as duas palavras, de acordo com o exemplo de output:
                [
                  { tipo: 'SOCIAL', rating: 'POSITIVE' },
                  { tipo: 'SOCIAL', rating: 'POSITIVE' },
                  { tipo: 'GENERAL', rating: 'POSITIVE' },
                  { tipo: 'GENERAL', rating: 'POSITIVE' }
                ]
                Analise a lista de comentarios a seguir e me devolva 2 informações para cada comentario em formato de Array<JSON>
                tipo:
                Me retorne com apenas uma dessas palavras, ENVIRONMENT, SOCIAL, GOVERNANCE OU GENERAL, baseado nas politicas de ESG de uma empresa onde GENERAL deve ser retornado quando  um comentario nao se encaixar em nenhuma das 3 politicas.
                rating:
                Me retorne com apenas uma dessas palavras, 
                POSITIVE, NEUTRAL, NEGATIVE, baseado na sentimentação do comentario;
                comentarios:
                ${listaComentarios}
                `,
      },
    ],
  });
  const stringResponse = await response.choices[0].message.content!;
  return JSON.parse(stringResponse);
}

export { analisarComentarios };
