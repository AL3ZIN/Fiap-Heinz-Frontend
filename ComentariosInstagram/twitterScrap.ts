import * as puppeteer from "puppeteer";
import { Postagem } from "./models/postagem";
import { Analise } from "./models/analise";
import { Comentario } from "./models/comentario";
import { analisarComentarios } from "./chatOpenAIAnaliseComentarios";
import { Url } from "url";

import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config({
  path: `${__dirname}/.env`,
});

const dataHoraAtual = new Date();

const seletorComentarios = process.env.SELETOR_COMENTARIOS!;
const seletorCurtidas = process.env.SELETOR_CURTIDAS!;
const seletorUsuarios = process.env.SELETOR_USUARIOS!;
const seletorPostagem = process.env.SELETOR_POSTAGEM!;
const seletorDataFeed = process.env.SELETOR_DATA_FEED!;
const seletorPerfil = process.env.SELETOR_PERFIL!;
const seletorDataPostagem = process.env.SELETOR_DATA_POSTAGEM!;

let legenda: string | null = null;

let listaFeedback: Array<Postagem> = []; // Inicialize a listaFeedback como um array vazio.
let listaInfoComments: Array<Comentario> = [];

async function getFeedbacksByPostURL(url: string): Promise<Postagem> {
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function scrollElementToBottom(page: puppeteer.Page, seletor: string) {
    const element = await page.$(seletor);
    if (element) {
      while (true) {
        const previousHeight = await page.evaluate(
          (el) => el.scrollHeight,
          element
        );

        await page.evaluate((el) => {
          el.scrollTop = el.scrollHeight;
        }, element);

        await page.waitForTimeout(1000); // Aguarde um curto período de tempo para carregar mais conteúdo

        const currentHeight = await page.evaluate(
          (el) => el.scrollHeight,
          element
        );

        if (previousHeight === currentHeight) {
          break; // Não há mais conteúdo para rolar
        }
      }
    }
  }

  async function getElements(page: puppeteer.Page, seletor: string) {
    const comentarios = await page.$$eval(seletor, (spans) =>
      spans.map((span) => String(span.textContent))
    );
    return comentarios;
  }
  async function getData(page: puppeteer.Page, seletor: string) {
    let listaFinal: Date[] = [];
    const listaData = await page.$$eval(seletor, (datelist) =>
      datelist.map((date) => date.getAttribute("datetime"))
    );
    for (let i = 0; i < listaData.length; i++) {
      const data = new Date(listaData[i]!);
      listaFinal.push(new Date(data.getTime()));
    }
    return listaFinal;
  }


  async function extrairNumeroCurtidas(listaCurtidas: Array<string>) {
    let listaCurtidasFormatada: Array<number> = [];
    for (let i = 0; i < listaCurtidas.length; i++) {
      const match = listaCurtidas[i].match(/(\d+)\s+curtida/);
      if (match) {
        listaCurtidasFormatada.push(parseInt(match[1], 10));
      } else {
        listaCurtidasFormatada.push(0);
      }
    }
    return listaCurtidasFormatada;
  }

  listaInfoComments = [];
  const browser = await puppeteer.launch({ headless: "new"});
  const page = await browser.newPage();
  await page.setViewport({ width: 783, height: 600 });
  const cookies = JSON.parse(fs.readFileSync("cookies.json", "utf-8"));
  await page.setCookie(...cookies);

  await page.goto(url);
  await scrollElementToBottom(page, process.env.SELETOR_CONTAINER_COMENTARIOS!);

  const listaComentarios = await getElements(page, seletorComentarios);
  const listaUsuarios = await getElements(page, seletorUsuarios);
  const legendaElement = await page.$(seletorPostagem);
  if (legendaElement) {
    legenda = await page.$eval(seletorPostagem, (legenda) => legenda.textContent);
  }
  
  const listaCurtidas = await getElements(page, seletorCurtidas);
  const listaDataFeed = await getData(page, seletorDataFeed);
  const dataPostagem = new Date(
    await page.$eval(
      seletorDataPostagem,
      (data) => data.getAttribute("datetime")!
    )
  );
  const perfil = await page.$eval(
    seletorPerfil,
    (perfil) => perfil.textContent
  );
  const currentUrl = await page.url();

  const embedLink = currentUrl.split('/').filter(Boolean).pop();

  let listaAnalise: any;
  listaAnalise = await analisarComentarios(listaComentarios)

  const listaCurtidasF = await extrairNumeroCurtidas(listaCurtidas);

  if (
    listaUsuarios.length > listaComentarios.length &&
    legenda != null &&
    listaDataFeed.length > listaComentarios.length
  ) {
    listaUsuarios.shift();
    listaDataFeed.shift();
  }

  for (let i = 0; i < listaComentarios.length; i++) {
    const comentariosFeed: Comentario = {
      usuario: listaUsuarios[i],
      comentario: listaComentarios[i],
      curtidas: listaCurtidasF[i],
      tipo: listaAnalise[i].tipo,
      rating: listaAnalise[i].rating,
      dataFeed: listaDataFeed[i],
    };
    listaInfoComments.push(comentariosFeed);
  }
  const postagem: Postagem = {
    perfil: perfil!,
    embedLink: embedLink!,
    postagemLink: new URL(url),
    legenda: legenda !== null ? legenda : 'Nenhuma legenda disponível',
    canal: "INSTAGRAM",
    dataPostagem: dataPostagem,
    dataCadastro: dataHoraAtual,
    comentarios: listaInfoComments,
  };
  browser.close();
  console.log(postagem)
  return postagem;
}
export { getFeedbacksByPostURL };
