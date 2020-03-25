import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { $ } from 'protractor';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  autores: Autor[];

  constructor(
    private alertController: AlertController
  ) {
    this.autores = [
      { id: 1, nome: 'David Flanagan' },
      { id: 2, nome: 'Douglas Cockford' },
    ];
  }

  ngOnInit() {
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
    this.autores = this.autores.filter(a => a.id !== autor.id);
  }

}
