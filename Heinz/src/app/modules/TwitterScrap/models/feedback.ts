
import { Comentarios } from "./comentarios";

export interface Feedback {
  perfil: string;
  embed_link: URL;
  postagem: URL;
  data: Date;
  comentarios: [
    Comentarios
  ];
}
