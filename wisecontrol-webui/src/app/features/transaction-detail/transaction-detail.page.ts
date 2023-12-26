import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { MessageService } from "../../core/services/message.service";
import { TransactionService } from "../../core/services/transaction.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage  {

  public transaction: Transaction;

  success: boolean;
  hasResult: boolean;


  constructor(
    private zone: NgZone,
    private router: Router,
    private transactionService: TransactionService,
    public messageService: MessageService,
    private route: ActivatedRoute
  ) { 

    
    this.success = false;
    this.hasResult = false;

    this.transaction = new Transaction();
  }


  ngOnInit() {
   
    this.loadTransaction();
    
  }

  private loadTransaction() {

  
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
  }


}
