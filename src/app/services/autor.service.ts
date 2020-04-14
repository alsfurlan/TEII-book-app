import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private autores: Autor[] = [
    { id: 1, nome: 'David Flanagan' },
    { id: 2, nome: 'Douglas Cockford' },
  ];

  constructor(
    private httpClient : HttpClient
  ) { }

  getAutores() {
    return this.httpClient.get<Autor[]>('http://localhost:3000/autores');
  }

  adicionar(autor: Autor) {
    return this.httpClient.post<Autor>('http://localhost:3000/autores', autor);
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
    return this.httpClient.delete(`http://localhost:3000/autores/${autor.id}`);
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
      return this.adicionar(autor);
    }
  }
}
