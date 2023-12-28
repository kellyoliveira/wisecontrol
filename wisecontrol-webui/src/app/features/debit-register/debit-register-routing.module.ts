import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebitRegisterPage } from './debit-register.page';

const routes: Routes = [
  {
    path: '',
    component: DebitRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebitRegisterPageRoutingModule {}
