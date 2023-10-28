import OpenAI from "openai";
import * as dotenv from "dotenv";
import { Analise } from "./models/analise";

dotenv.config({
  path: `${__dirname}/.env`,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function extrairValoresJSON(saidaGPT: string): Analise[] | null {
  // Use expressões regulares para encontrar os valores de "tipo" e "rating"
  const tipoMatches = saidaGPT.match(/"tipo":\s*"(.*?)"/g);
  const ratingMatches = saidaGPT.match(/"rating":\s*"(.*?)"/g);

  // Verifique se encontrou correspondências e extraia os valores
  if (tipoMatches && ratingMatches) {
    const resultados: Analise[] = [];

    for (let i = 0; i < tipoMatches.length; i++) {
      const tipoMatch = tipoMatches[i].match(/"tipo":\s*"(.*?)"/);
      const ratingMatch = ratingMatches[i].match(/"rating":\s*"(.*?)"/);

      if (tipoMatch && ratingMatch) {
        const tipo = tipoMatch[1];
        const rating = ratingMatch[1];

        resultados.push({ tipo, rating });
      }
    }

    return resultados;
  } else {
    return null; // Não foram encontradas correspondências
  }
}

async function analisarComentarios(
  listaComentarios: string[]
): Promise<Analise[]> {
  const MAX_COMMENTS_PER_BATCH = 30;
  const resultados: Analise[] = [];

  try {
    for (let i = 0; i < listaComentarios.length; i += MAX_COMMENTS_PER_BATCH) {
      const comentariosBatch = listaComentarios.slice(
        i,
        i + MAX_COMMENTS_PER_BATCH
      );

      const comentariosParaAnalise = comentariosBatch.map((comentario) => {
        return `Comentário: ${comentario}`;
      });

      const comentariosParaAnaliseFormatados =
        comentariosParaAnalise.join("\n");

      console.log(comentariosParaAnaliseFormatados);

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
            Me de uma analise resumida

          

            Aqui está a lista de comentários:
            ${comentariosParaAnaliseFormatados}

            Exemplo de saída esperada:
            [
              { "tipo": "SOCIAL", "rating": "POSITIVE" },
              { "tipo": "SOCIAL", "rating": "POSITIVE" },
              { "tipo": "GENERAL", "rating": "POSITIVE" },
              ...
            ]
          `,
          },
        ],
      });

      if (response.choices[0].message.content === "error") {
        console.error(
          "Erro na resposta do OpenAI:",
          response.choices[0].message.content
        );
        break; // Sair do loop em caso de erro
      }

      const stringResponse = response.choices[0].message.content;

      // Use a função para extrair valores JSON
      const valoresJSON = extrairValoresJSON(stringResponse!);

      if (valoresJSON) {
        resultados.push(...valoresJSON);
        console.log(resultados);
        console.log(resultados.length);
      }
    }

    return resultados;
  } catch (e) {
    console.error("Erro na função analisarComentarios:", e);
    return [];
  }
}

export { analisarComentarios };
