import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autor.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Autor } from 'src/app/models/autor.interface';

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
    this.autor = { nome: '' };
  }

  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.autorService.getAutor(id).subscribe((autor) => {
        this.autor = autor;
        loading.dismiss();
      });
    } 
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
