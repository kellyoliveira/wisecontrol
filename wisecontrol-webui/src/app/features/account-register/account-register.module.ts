import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRegisterPageRoutingModule } from './account-register-routing.module';
import { AccountRegisterPage } from './account-register.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountRegisterPageRoutingModule
  ],
  declarations: [AccountRegisterPage]
})
export class AccountRegisterPageModule {}
