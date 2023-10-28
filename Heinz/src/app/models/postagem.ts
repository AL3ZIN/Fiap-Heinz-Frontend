import { Comentario } from "./comentario";

export interface Postagem {
  perfil: string;
  embedLink: string;
  postagemLink: URL;
  legenda: string;
  canal: string;
  dataPostagem: Date;
  dataCadastro: Date;
  comentarios: Array<Comentario>;
}
