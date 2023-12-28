import { Component, NgZone } from "@angular/core";
import { Account } from "../../core/view-models/account";
import { MessageService } from "../../core/services/message.service";
import { AccountService } from "../../core/services/account.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.page.html',
  styleUrls: ['./account-register.page.scss'],
})
export class AccountRegisterPage  {

  success: boolean = false;
  hasResult: boolean = false;
  errorMessage: string = "";
  account:Account = new Account();

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService
  ) { 

    
    this.success = false;
    this.hasResult = false;
    
  }

  ngOnInit() {
   
    
  }


  registerAccount() {

    
  }

  saveAccount() {

    this.errorMessage = '';
    this.messageService.blockUI();
    this.messageService.isLoadingData = true;

    this.accountService.createAccount(this.account).subscribe(
      p => {
      
        this.messageService.isLoadingData = false;
        this.success = true;
        
        this.account.accountId = p.accountId;

      },
      err => {

        alert(JSON.stringify(err));

        this.messageService.isLoadingData = false;
        this.success = false;


        this.errorMessage = err.error.message;

        alert(this.errorMessage);
      }
    );
  }
  
}
