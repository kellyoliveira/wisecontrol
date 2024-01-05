import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { MessageService } from "../../core/services/message.service";
import { TransactionService } from "../../core/services/transaction.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
    this.debitForm = new FormGroup({
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

    console.log(this.transaction);

    this.saveTransactionDebit();
  }


  saveTransactionDebit() {


    alert("saveTransactionDebit");

    this.errorMessage = '';
    this.messageService.blockUI();
    this.messageService.isLoadingData = true;

    this.transactionService.createTransactionDebit(this.transaction).subscribe(
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
