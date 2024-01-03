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
   
    this.loadAccounts();
    
  }


  private loadAccounts() {

    this.messageService.isLoadingData = true;
    
    this.hasResult = false;
    this.success = false;////////////////

    this.accountService.getAccounts(c => { this.totalCount = c; }).subscribe(a => {

      this.messageService.isLoadingData = false;

      alert(JSON.stringify(a));
    
      this.accounts = a;     

      this.hasResult = true;
      this.success = true;

      console.log(JSON.stringify(a));
      
    });
  }

}
