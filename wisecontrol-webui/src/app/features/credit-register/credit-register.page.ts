import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { MessageService } from "../../core/services/message.service";
import { TransactionService } from "../../core/services/transaction.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-credit-register',
  templateUrl: './credit-register.page.html',
  styleUrls: ['./credit-register.page.scss'],
})
export class CreditRegisterPage  {

  success: boolean = false;
  hasResult: boolean = false;
  private totalCount = 0;

  protected transactions: Transaction[] = [];

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private transactionService: TransactionService
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

    this.transactionService.getTransactions(c => { this.totalCount = c; }).subscribe(t => {

      this.messageService.isLoadingData = false;
    
      this.transactions = t;     

      this.hasResult = true;
      this.success = true;

    
      
    });
  }


  itemAction(content: Transaction) {

    content.transactionId = '1';
    
    this.router.navigate(['../transaction-detail/' + content.transactionId ]);

    
  }
}
