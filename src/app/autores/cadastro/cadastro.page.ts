import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autor.service';
import { NavController, LoadingController } from '@ionic/angular';
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
    private navController : NavController,
    private loadingController : LoadingController
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


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.autorService
      .salvar(this.autor)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/autores']);
      });
  }

}
