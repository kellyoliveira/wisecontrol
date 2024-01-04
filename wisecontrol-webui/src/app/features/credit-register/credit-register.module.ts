import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditRegisterPageRoutingModule } from './credit-register-routing.module';
import { CreditRegisterPage } from './credit-register.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CreditRegisterPageRoutingModule
  ],
  declarations: [CreditRegisterPage]
})
export class CreditRegisterPageModule {}
