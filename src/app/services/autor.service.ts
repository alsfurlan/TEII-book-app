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

  atualizar(autor: Autor) {
    // const a = this.getAutor(autor.id);
    // Object.assign(a, autor);
    // console.log(a); 
    // console.log(this.autores);
    this.autores.forEach(a => {
      if(a.id === autor.id) {
        Object.assign(a, autor);        
      }
    });    
    // for (var i = 0; i < this.autores.length; i++) {
    //   let a = this.autores[i];
    //   if (a.id === autor.id) {
    //     a.nome = autor.nome;
    //   }
    // }
  }

  excluir(autor: Autor) {
    this.autores = this.autores.filter(a => a.id !== autor.id);
  }

  getAutor(id: number) {
    const autor = this.autores.find(a => a.id === id);
    // return Object.assign({}, autor);
    return { ...autor };
  }

  salvar(autor: Autor) {
    if (autor && autor.id) {
      this.atualizar(autor);
    } else {
      this.adicionar(autor);
    }
  }
}
