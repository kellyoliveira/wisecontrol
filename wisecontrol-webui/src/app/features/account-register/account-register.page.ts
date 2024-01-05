import { Component, NgZone } from "@angular/core";
import { Account } from "../../core/view-models/account";
import { MessageService } from "../../core/services/message.service";
import { AccountService } from "../../core/services/account.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.page.html',
  styleUrls: ['./account-register.page.scss'],
})
export class AccountRegisterPage  {

  accountForm!: FormGroup;
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
    
    this.buildForm();
  }

  ngOnInit() {
    
  }

  private buildForm() {
    this.accountForm = new FormGroup({
        description: new FormControl('', [Validators.required])
    });
  }

  private validateDataAccount() : boolean {
    if (!this.accountForm.valid) {
      return false;
    }
    
    return true;

  }

  registerAccount() {

    if (!this.validateDataAccount()) {
      return;
    }
  
    
    this.account.description = this.accountForm.get('description')?.value;
    this.account.owner = "kelly.oliveira";

    console.log(this.account);

    this.saveAccount();
  }


  

  saveAccount() {



    this.errorMessage = '';
    this.messageService.blockUI();
    this.messageService.isLoadingData = true;

    this.accountService.createAccount(this.account).subscribe({
      next:(r) => {
        this.messageService.isLoadingData = false;
        this.success = true;
        
        this.account.accountId = r.accountId;

        this.router.navigate(['/accounts']);

      },
      error:(err) => {
        alert(JSON.stringify(err));

        this.messageService.isLoadingData = false;
        this.success = false;


        this.errorMessage = err.error.message;

        alert(this.errorMessage);
      }

    });
    
  }
  
}
