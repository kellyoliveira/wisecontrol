import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebitRegisterPageRoutingModule } from './debit-register-routing.module';
import { DebitRegisterPage } from './debit-register.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DebitRegisterPageRoutingModule
  ],
  declarations: [DebitRegisterPage]
})
export class DebitRegisterPageModule {}
