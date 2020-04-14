import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AutorService } from '../services/autor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  autores: Autor[];

  constructor(
    private alertController: AlertController,
    private autorService: AutorService,
    private loadingController: LoadingController 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    // this.autores = this.autorService.getAutores();
    this.autorService.getAutores().subscribe((data) => {
      this.autores = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(autor: Autor) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o autor ${autor.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(autor);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  excluir(autor: Autor) {
    this.autorService.excluir(autor).subscribe(() => this.listar());
  }

}
