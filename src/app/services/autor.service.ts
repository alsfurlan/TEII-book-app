import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private autores: Autor[] = [
    { id: 1, nome: 'David Flanagan' },
    { id: 2, nome: 'Douglas Cockford' },
  ];

  constructor() { }

  getAutores() {
    return this.autores;
  }

  adicionar(autor: Autor) {
    // this.autores.push(autor);
    autor.id = parseInt((Math.random() * 100).toFixed(0));
    this.autores = [...this.autores, autor];
  }

  excluir(autor: Autor) {
    this.autores = this.autores.filter(a => a.id !== autor.id);
  }
}
