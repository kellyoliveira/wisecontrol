import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionDetailPageRoutingModule } from './transaction-detail-routing.module';
import { TransactionDetailPage } from './transaction-detail.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TransactionDetailPageRoutingModule
  ],
  declarations: [TransactionDetailPage]
})
export class TransactionDetailPageModule {}
