import puppeteer, { Page } from "puppeteer";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config({
  path: `${__dirname}/.env`,
});
// Função para fazer login no Instagram e salvar os cookies
async function loginAndSaveCookies() {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/");

  // Fazer login

  await page.waitForSelector("[name=username]");

  await page.type("[name=username]", process.env.INSTAGRAM_USERNAME!);
  await page.type("[name=password]", process.env.INSTAGRAM_PASSWORD!);
  await page.click("[type=submit]");
  await page.waitForNavigation();

  // Esperar até que o usuário esteja logado (você pode ajustar isso de acordo com suas necessidades)

  // Obter os cookies
  const cookies = await page.cookies();

  await browser.close();

  // Salvar os cookies em um arquivo
  fs.writeFileSync("cookies.json", JSON.stringify(cookies));
}


loginAndSaveCookies();
