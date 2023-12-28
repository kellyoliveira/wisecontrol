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


  
}
