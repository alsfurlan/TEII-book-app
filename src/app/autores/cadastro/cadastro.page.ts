import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autor.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  autor: Autor;

  constructor(
    private autorService : AutorService,
    private navController : NavController
  ) {
    this.autor = { nome: '' };
  }

  ngOnInit() {
  }


  salvar() {
    this.autorService.adicionar(this.autor);
    this.navController.navigateForward(['/autores']);
  }

}
