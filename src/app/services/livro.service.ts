import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro } from '../models/livro.interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  
  private URI = 'http://localhost:3000/livros';
  
  constructor(
    private httpClient:HttpClient
  ) { }
    
  getLivros() {
    return this.httpClient.get<Livro[]>(this.URI);
  }

  excluir(livro: Livro) {
    return this.httpClient.delete(`${this.URI}/${livro.id}`);
  }
}
