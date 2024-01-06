import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRegisterPageRoutingModule } from './user-register-routing.module';
import { UserRegisterPage } from './user-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRegisterPageRoutingModule
  ],
  declarations: [UserRegisterPage]
})
export class UserRegisterPageModule {}
