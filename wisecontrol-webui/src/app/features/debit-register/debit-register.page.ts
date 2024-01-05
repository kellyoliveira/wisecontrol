import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { MessageService } from "../../core/services/message.service";
import { TransactionService } from "../../core/services/transaction.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { List } from "../../core/view-models/list";
import { Account } from "../../core/view-models/account";
import { AccountService } from "../../core/services/account.service";

@Component({
  selector: 'app-debit-register',
  templateUrl: './debit-register.page.html',
  styleUrls: ['./debit-register.page.scss'],
})
export class DebitRegisterPage  {

  debitForm!: FormGroup;
  success: boolean = false;
  hasResult: boolean = false;
  protected transaction: Transaction = new Transaction();
  errorMessage: string = "";
  public accounts: List<Account> = new List<Account>();

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    protected messageService: MessageService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) { 

    this.buildForm();
   
    this.success = false;
    this.hasResult = false;
  }

  ngOnInit() {
    this.loadAccounts();
  }

  private loadAccounts() {

    this.messageService.isLoadingData = true;
    
    this.accounts.hasResult = false;
    this.accounts.success = false;////////////////

    
    this.accountService.getAccounts().subscribe(c => {

      this.messageService.isLoadingData = false;

      console.log(JSON.stringify(c));
    
      this.accounts = c;  

      this.accounts.hasResult = true;
      this.accounts.success = true;

      console.log(JSON.stringify(c));
      
    });
  }


  private buildForm() {
    this.debitForm = new FormGroup({
        accountId: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        value: new FormControl('', [Validators.required])
    });
  }
  
  private validateDataDebit() : boolean {
    if (!this.debitForm.valid) {
      return false;
    }

    return true;
  }

  registerDebit() {
    
    if (!this.validateDataDebit()) {
      return;
    }

    this.transaction.description = this.debitForm.get('description')?.value;
    this.transaction.value = this.debitForm.get('value')?.value;
    this.transaction.accountId = Number(this.debitForm.get('accountId')?.value);
    

    console.log(this.transaction);

    this.saveTransactionDebit();
  }


  saveTransactionDebit() {

    this.errorMessage = '';
    this.messageService.blockUI();
    this.messageService.isLoadingData = true;

    this.transactionService.createTransactionDebit(this.transaction).subscribe({
      next:(r) => {
        this.messageService.isLoadingData = false;
        this.success = true;
        
        this.transaction.transactionId = r.transactionId;

        this.router.navigate(['/transaction-succeed']);
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
