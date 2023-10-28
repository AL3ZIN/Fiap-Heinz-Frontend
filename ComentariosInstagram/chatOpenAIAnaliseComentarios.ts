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
            Gere uma lista de informações em formato JSON, onde cada elemento da lista deve seguir o seguinte formato:

            - "tipo": Este campo deve ser preenchido com base nos conceitos ESG (Ambiental, Social e Governança) empresariais. Escolha entre as palavras:
              - "ENVIRONMENT" - preencher com essa palavra quando o contexto do comentario for a cerca da questão ambiental.
              - "SOCIAL" preencher com essa palavra quando o contexto do comentario for a cerca da questão social, como por exemplo diversidade,cultura da empresa e questões que afetam funcionários, clientes, consumidores e fornecedores.
              - "GOVERNANCE" - preencher com essa palavra quando o contexto do comentario for a cerca de boas Práticas de Governança Corporativa: composição e diversidade no seu Conselho de Administração e na sua comunicação, além de políticas de transparência e códigos bem definidos para a prevenção aos desvios de conduta e à corrupção.
              - "GENERAL" - Use esta opção quando um comentário não se encaixar em nenhuma das três políticas.
            - "rating": Este campo deve ser preenchido com base na sentimentação do comentário. Escolha entre as palavras:
              - "POSITIVE" - Comentarios positivos, como elogios por exemplo
              - "NEUTRAL" - Comentarios que acabam não tendo o entuito de falar mal ou bem sobre algo, mas sim fazer um comentario em si, seja expondo um fato ou expondo algo pessoal por exemplo
              - "NEGATIVE" - Comentarios negativos, como xingamentos ou criticas fortes somente com o intuito de falar mal

            Por favor, analise a lista de comentários abaixo e retorne as informações em formato JSON. Para cada comentário, o numero de elementos tem que ser o mesmo do que de comentarios, forneça um objeto com esses dois campos.

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
