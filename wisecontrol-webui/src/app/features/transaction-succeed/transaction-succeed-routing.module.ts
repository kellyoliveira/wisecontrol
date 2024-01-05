import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionSucceedPage } from './transaction-succeed.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionSucceedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSucceedPageRoutingModule {}
