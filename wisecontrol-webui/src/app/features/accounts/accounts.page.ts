import { Component, NgZone } from "@angular/core";
import { MessageService } from "../../core/services/message.service";
import { AccountService } from "../../core/services/account.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Account } from "../../core/view-models/account";
import { List } from "../../core/view-models/list";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage  {

  

  public accounts: List<Account> = new List<Account>();

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
   
    this.loadAccounts();
    
  }


  private loadAccounts() {

    this.messageService.isLoadingData = true;
    
    this.accounts.hasResult = false;
    this.accounts.success = false;////////////////

    
    this.accountService.getAccounts().subscribe(a => {

      this.messageService.isLoadingData = false;

      console.log(JSON.stringify(a));
    
      this.accounts = a;  

      this.accounts.hasResult = true;
      this.accounts.success = true;

      console.log(JSON.stringify(a));
      
    });
  }

}
function foreach() {
  throw new Error("Function not implemented.");
}

