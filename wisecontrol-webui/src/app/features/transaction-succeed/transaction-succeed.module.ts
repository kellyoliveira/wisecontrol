import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionSucceedPageRoutingModule } from './transaction-succeed-routing.module';
import { TransactionSucceedPage } from './transaction-succeed.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TransactionSucceedPageRoutingModule
  ],
  declarations: [TransactionSucceedPage]
})
export class TransactionSucceedPageModule {}
