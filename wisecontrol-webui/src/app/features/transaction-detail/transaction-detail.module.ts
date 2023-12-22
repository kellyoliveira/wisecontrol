import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionDetailPageRoutingModule } from './transaction-detail-routing.module';
import { TransactionDetailPage } from './transaction-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TransactionDetailPageRoutingModule
  ],
  declarations: [TransactionDetailPage]
})
export class TransactionDetailPageModule {}
