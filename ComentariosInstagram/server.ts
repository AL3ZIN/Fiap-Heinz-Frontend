import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { getFeedbacksByPostURL } from "./twitterScrap";
import axios from "axios";
import { Postagem } from "./models/postagem";
import cors from "cors";

const allowedOrigins = ["http://localhost:4200"];
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Rota para receber dados com a URL como parâmetro
app.get("/api/instagram/*", async (req: Request, res: Response) => {
  const instagramUrl = req.params[0];

  try {
    let feedback: Postagem;
    feedback = await getFeedbacksByPostURL(instagramUrl);
    res.json(feedback);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao processar os dados", erro: error });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express está ouvindo na porta ${port}`);
});
