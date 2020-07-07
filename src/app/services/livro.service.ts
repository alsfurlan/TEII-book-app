import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro } from '../models/livro.interface';
import { BASE_API } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private URI = BASE_API + 'livros';
  
  constructor(
    private httpClient:HttpClient
  ) { }
    
  getLivros() {
    return this.httpClient.get<Livro[]>(this.URI);
  }

  excluir(livro: Livro) {
    return this.httpClient.delete(`${this.URI}/${livro.id}`);
  }

  private adicionar(livro: Livro) {
    return this.httpClient.post(this.URI, livro);
  }

  private atualizar(livro: Livro) {
    return this.httpClient.put(`${this.URI}/${livro.id}`, livro);
  }

  salvar(livro: Livro) {
    if(livro.id) {
      return this.atualizar(livro);
    } else {
      return this.adicionar(livro);
    }
  }

  getLivro(id: number) {
    return this.httpClient.get<Livro>(`${this.URI}/${id}`);
  }
  
}
