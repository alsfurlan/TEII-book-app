import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro.service';
import { Livro } from '../models/livro.interface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {

  livros: Livro[];

  constructor(
    private livroService: LivroService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const busyLoader = await this.loadingController.create({message: 'Carregando livros...'});
    busyLoader.present();
    
    this.livros = await this.livroService.getLivros().toPromise();
    busyLoader.dismiss();
  }
}
