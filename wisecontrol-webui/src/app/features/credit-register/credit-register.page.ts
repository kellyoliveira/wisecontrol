import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { MessageService } from "../../core/services/message.service";
import { TransactionService } from "../../core/services/transaction.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-credit-register',
  templateUrl: './credit-register.page.html',
  styleUrls: ['./credit-register.page.scss'],
})
export class CreditRegisterPage  {

  creditForm!: FormGroup;
  success: boolean = false;
  hasResult: boolean = false;
  protected transaction: Transaction = new Transaction();
  errorMessage: string = "";
  

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private transactionService: TransactionService
  ) { 

    this.buildForm();
    this.success = false;
    this.hasResult = false;
  }

  ngOnInit() {
   
  }


  private buildForm() {
    this.creditForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        value: new FormControl('', [Validators.required])
    });
  }

  private validateDataCredit() : boolean {
    if (!this.creditForm.valid) {
      return false;
    }

    return true;
  }
  
  registerCredit() {
    
    if (!this.validateDataCredit()) {
      return;
    }
  

    this.transaction.description = this.creditForm.get('description')?.value;
    this.transaction.value = Number(this.creditForm.get('value')?.value);

    console.log(this.transaction);

    this.saveTransactionCredit();
  }


  saveTransactionCredit() {


    alert("saveTransactionCredit");

    this.errorMessage = '';
    this.messageService.blockUI();
    this.messageService.isLoadingData = true;

    this.transactionService.createTransactionCredit(this.transaction).subscribe(
      p => {
      
        this.messageService.isLoadingData = false;
        this.success = true;
        
        this.transaction.transactionId = p.transactionId;

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