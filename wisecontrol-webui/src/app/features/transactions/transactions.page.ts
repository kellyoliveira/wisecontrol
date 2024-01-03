import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { MessageService } from "../../core/services/message.service";
import { TransactionService } from "../../core/services/transaction.service";
import { ActivatedRoute, Router } from "@angular/router";
import { List } from "../../core/view-models/list";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage  {

  public transactions: List<Transaction> = new List<Transaction>();

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private transactionService: TransactionService
  ) { 

    
    this.transactions.success = false;
    this.transactions.hasResult = false;
  }

  ngOnInit() {
   
    this.loadTransactions();
    
  }


  private loadTransactions() {

    this.messageService.isLoadingData = true;
    
    this.transactions.hasResult = false;
    this.transactions.success = false;////////////////

    this.transactionService.getTransactions().subscribe(t => {

      this.messageService.isLoadingData = false;
    
      this.transactions = t;     

      this.transactions.hasResult = true;
      this.transactions.success = true;

    
      
    });
  }


  itemAction(content: Transaction) {
    
    this.router.navigate(['../transaction-detail/' + content.transactionId ]);

    
  }
}
