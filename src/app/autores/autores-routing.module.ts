import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoresPage } from './autores.page';

const routes: Routes = [
  {
    path: '',
    component: AutoresPage
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoresPageRoutingModule {}
