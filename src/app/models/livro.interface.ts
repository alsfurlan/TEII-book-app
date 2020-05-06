import { Autor } from './autor.interface';

export interface Livro {
    id?: number;
    titulo: string;
    isbn: string;
    paginas: number;
    preco: number;
    imagem: string;
    autores: Autor[];
    editora: string;
    lancamento?: Date;
}