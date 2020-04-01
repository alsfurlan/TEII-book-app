import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AutorService } from '../services/autor.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  autores: Autor[];

  constructor(
    private alertController: AlertController,
    private autorService: AutorService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    this.autores = this.autorService.getAutores();
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
    this.autorService.excluir(autor);
    this.listar();
  }

}
