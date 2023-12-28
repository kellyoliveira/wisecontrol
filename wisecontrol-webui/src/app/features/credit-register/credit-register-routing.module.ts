import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditRegisterPage } from './credit-register.page';

const routes: Routes = [
  {
    path: '',
    component: CreditRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditRegisterPageRoutingModule {}
