import * as puppeteer from "puppeteer";
import { Feedback } from "./models/feedback";
import { Analise } from "./models/analise";
import { Comentarios } from "./models/comentarios";
import { analisarComentarios } from "./chatOpenAI";

import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config({
  path: `${__dirname}/.env`,
});

const dataHoraAtual = new Date();
const fusoHorario = dataHoraAtual.getTimezoneOffset();
const dataHoraAtualFusoArrumado = new Date(
  dataHoraAtual.getTime() - fusoHorario * 60000
);
console.log(dataHoraAtualFusoArrumado);

const seletorComentarios = process.env.SELETOR_COMENTARIOS!;
const seletorCurtidas = process.env.SELETOR_CURTIDAS!;
const seletorUsuarios = process.env.SELETOR_USUARIOS!;
const seletorPostagem = process.env.SELETOR_POSTAGEM!;
const seletorDataFeed = process.env.SELETOR_DATA_FEED!;
const seletorEmbedLink = process.env.SELETOR_EMBED_LINK!;
const seletorPerfil  = process.env.SELETOR_PERFIL!;
const seletorDataPostagem  = process.env.SELETOR_DATA_POSTAGEM!;
const seletorContainerComentarios = process.env.SELETOR_CONTAINER_COMENTARIOS!;
const seletorMoreOptionButton = process.env.SELETOR_MORE_OPTIONS_BUTTON!;
const seletorOptionButtons = process.env.SELETOR_OPTION_BUTTONS!

let listaFeedback: Array<Feedback> = []; // Inicialize a listaFeedback como um array vazio.
let listaInfoComments : Array<Comentarios> =[];

async function getFeedbacksByPostURL(url: string) {
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
    console.log("entrou");
    const comentarios = await page.$$eval(seletor, (spans) =>
      spans.map((span) => String(span.textContent))
    );
    return comentarios;
  }
  async function getData(page: puppeteer.Page, seletor: string) {
    let listaFinal: Date[] = [];
    console.log("entrou");
    const listaData = await page.$$eval(seletor, (datelist) =>
      datelist.map((date) => date.getAttribute("datetime"))
    );
    for (let i = 0; i < listaData.length; i++) {
      const data = new Date(listaData[i]!);
      listaFinal.push(new Date(data.getTime()));
    }
    return listaFinal;
  }
  async function getEmbedLink(page: puppeteer.Page, seletor: string) {
    await page.click(seletorMoreOptionButton);

    await page.waitForSelector(seletorOptionButtons);

    const botoesOpcoes = await page.$$(seletorOptionButtons);

    botoesOpcoes[2].click();

    await page.waitForSelector(seletor);
    await delay(1000);

    const embedLink = await page.$eval(
      seletor,
      (text) => text.textContent?.match(/data-instgrm-permalink="([^"]+)"/)!
    );

    return embedLink[1];
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

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 783, height: 600 });
  const cookies = JSON.parse(fs.readFileSync("cookies.json", "utf-8"));
  await page.setCookie(...cookies);

  await page.goto(url);
  await scrollElementToBottom(page,seletorContainerComentarios );

  const listaComentarios = await getElements(page, seletorComentarios);
  const listaUsuarios = await getElements(page, seletorUsuarios);
  const postagem = await getElements(page, seletorPostagem);
  const listaCurtidas = await getElements(page, seletorCurtidas);
  const listaDataFeed = await getData(page, seletorDataFeed);
  const dataPostagem= await getData(page, seletorDataPostagem);
  const perfil = await page.$eval(seletorPerfil, (perfil) => perfil.textContent)
  const embedLink = await getEmbedLink(page, seletorEmbedLink);


  let listaAnalise: Array<Analise>;
  // listaAnalise = await analisarComentarios(listaComentarios);
  listaAnalise = [
    { tipo: "SOCIAL", rating: "POSITIVE" },
    { tipo: "SOCIAL", rating: "POSITIVE" },
    { tipo: "GENERAL", rating: "POSITIVE" },
    { tipo: "GENERAL", rating: "POSITIVE" },
  ];



  console.log(listaComentarios);
  console.log(listaUsuarios);
  console.log(postagem);
  console.log(listaCurtidas);
  console.log(listaAnalise);
  console.log(listaDataFeed);
  console.log(dataPostagem);
  console.log(embedLink);

  const listaCurtidasF = await extrairNumeroCurtidas(listaCurtidas);

  if (
    listaUsuarios.length > listaComentarios.length &&
    postagem != null &&
    listaDataFeed.length > listaComentarios.length
  ) {
    listaUsuarios.shift();
    listaDataFeed.shift();
  }

  console.log(listaAnalise[0].tipo);



  for (let i = 0; i < listaComentarios.length; i++) {
    const comentariosFeed:Comentarios = {
      usuario: listaUsuarios[i],
      comentario: listaComentarios[i],
      curtidas: listaCurtidasF[i],
      tipo: listaAnalise[0].tipo,
      rating: listaAnalise[0].rating,
      dataFeed: listaDataFeed[i],
      dataCadastro: dataHoraAtualFusoArrumado
    }
  listaInfoComments.push(comentariosFeed);
  }
  const feedback = {
    perfil: perfil,
    embedLink: embedLink,
    postagem: url,
    data: dataPostagem,
    comentarios: listaInfoComments
  };
  console.log(feedback);
}

console.log(seletorContainerComentarios)
export { getFeedbacksByPostURL };
