
export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
}

export interface ComentarioList {
    usuario: string;
    comentario: string;
    curtidas: number;
  }
  