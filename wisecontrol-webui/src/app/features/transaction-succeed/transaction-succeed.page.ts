import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { MessageService } from "../../core/services/message.service";
import { TransactionService } from "../../core/services/transaction.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-transaction-succeed',
  templateUrl: './transaction-succeed.page.html',
  styleUrls: ['./transaction-succeed.page.scss'],
})
export class TransactionSucceedPage  {

  

  constructor(
    private zone: NgZone,
    private router: Router,
    private transactionService: TransactionService,
    public messageService: MessageService,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {}

  

}
