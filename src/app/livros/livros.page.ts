import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro.service';
import { Livro } from '../models/livro.interface';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {

  livros: Livro[];

  constructor(
    private livroService: LivroService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const busyLoader = await this.iniciarCarregamento('Carregando livros ...');
    
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
    const busyLoader = await this.iniciarCarregamento('Excluíndo ...');
    
    this.livroService.excluir(livro).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

  private async iniciarCarregamento(mensagem: string) {
    const busyLoader = await this.loadingController.create({ message: mensagem });
    busyLoader.present();
    return busyLoader;
  }
}
