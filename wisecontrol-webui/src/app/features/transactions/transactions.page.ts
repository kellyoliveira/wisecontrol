import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { MessageService } from "../../core/services/message.service";
import { TransactionService } from "../../core/services/transaction.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage  {

  public transaction: Transaction = new Transaction();

  success: boolean = false;
  hasResult: boolean = false;


  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private transactionService: TransactionService
  ) { 

    
    this.success = false;
    this.hasResult = false;

    this.transaction = new Transaction();
  }

  /*private loadTransaction() {

    let transactionId = this.route.snapshot.paramMap.get('id')!;

    this.messageService.isLoadingData = true;
    
    this.hasResult = false;
    this.success = false;////////////////

    this.transactionService.getTransaction(transactionId).subscribe(t => {

      this.messageService.isLoadingData = false;
    
      this.transaction = t;     

      this.hasResult = true;
      this.success = true;
      
    });
  }*/

 
}
