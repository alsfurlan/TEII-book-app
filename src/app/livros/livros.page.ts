import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro.service';
import { Livro } from '../models/livro.interface';
import { LoadingController, AlertController } from '@ionic/angular';
import { BusyLoaderService } from '../services/busy-loader.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {

  livros: Livro[];

  constructor(
    private livroService: LivroService,
    private busyLoader: BusyLoaderService,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const busyLoader = await this.busyLoader.create('Carregando livros ...');
    
    this.livros = await this.livroService.getLivros().toPromise();
    busyLoader.dismiss();
  }

  async confirmacaoExclusao(livro: Livro) {
    const alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o livro ${livro.titulo}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(livro)
        },
        {
          text: 'Não'
        }
      ]
    });
    alerta.present();       
  }

  private async excluir(livro: Livro) {
    const busyLoader = await this.busyLoader.create('Excluíndo ...');
    
    this.livroService.excluir(livro).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
