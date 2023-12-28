import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsPageRoutingModule } from './accounts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AccountsPage } from './accounts.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AccountsPageRoutingModule
  ],
  declarations: [AccountsPage]
})
export class AccountsPageModule {}
