import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autor.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  autor: Autor;

  constructor(
    private autorService : AutorService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController
  ) {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);       
    if(id) {
      this.autor = this.autorService.getAutor(id);
    } else {    
      this.autor = { nome: '' };
    }
  }


  ngOnInit() {
  }


  salvar() {
    this.autorService.salvar(this.autor);
    this.navController.navigateForward(['/autores']);
  }

}
