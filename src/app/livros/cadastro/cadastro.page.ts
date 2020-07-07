import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autor.service';
import { Autor } from 'src/app/models/autor.interface';
import { NavController } from '@ionic/angular';
import { BusyLoaderService } from 'src/app/services/busy-loader.service';
import { Livro } from 'src/app/models/livro.interface';
import { LivroService } from 'src/app/services/livro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  livro: Livro;
  autores: Autor[];

  constructor(
    private autorService: AutorService,
    private livroService: LivroService,
    private busyLoader: BusyLoaderService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) { 
    this.livro = {
      titulo: '',
      autores: [],
      editora: '',
      imagem: '',
      isbn: '',
      paginas: 0,
      preco: 0.00,
      lancamento: new Date(),
    };
  }

  ngOnInit() {
    this.listarAutores();
  }

  async listarAutores() {
    const busyLoader = await this.busyLoader.create('Carregando autores...');
    
    this.autorService.getAutores().subscribe((autores) => {
      this.autores = autores;
      this.carregarLivro();
      busyLoader.dismiss();
    });
  }

  carregarLivro() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.livroService.getLivro(id).subscribe(livro => this.livro = livro);
    }
  }

  compareWith(autor1: Autor, autor2: Autor) {
    return autor1 && autor2 ? autor1.id === autor2.id : autor1 === autor2;
  };

  async salvar(livro: Livro) {
    const loading = await this.busyLoader.create('Salvando livro...');

    this.livroService
      .salvar(livro)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/livros']);
      }, () => {
        loading.dismiss();
      });
  }

}
