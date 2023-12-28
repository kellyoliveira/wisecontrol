import { Component, NgZone } from "@angular/core";
import { MessageService } from "../../core/services/message.service";
import { AccountService } from "../../core/services/account.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Account } from "../../core/view-models/account";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage  {

  success: boolean = false;
  hasResult: boolean = false;
  private totalCount = 0;

  protected accounts: Account[] = [];

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
   
    this.loadTransactions();
    
  }


  private loadTransactions() {

    this.messageService.isLoadingData = true;
    
    this.hasResult = false;
    this.success = false;////////////////

    this.accountService.getAccounts(c => { this.totalCount = c; }).subscribe(a => {

      this.messageService.isLoadingData = false;
    
      this.accounts = a;     

      this.hasResult = true;
      this.success = true;

    
      
    });
  }


  itemAction(content: Account) {
      this.router.navigate(['../transaction-detail/' + content.accountId ]);
  }
}
