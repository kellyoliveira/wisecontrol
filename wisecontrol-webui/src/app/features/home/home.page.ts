import { Component, NgZone } from "@angular/core";
import { Transaction } from "../../core/view-models/transaction";
import { Account } from "../../core/view-models/account";
import { Dashboard } from "../../core/view-models/dashboard";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "../../core/services/message.service";
import { DashboardService } from "../../core/services/dashboard.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {
  success: boolean = false;
  hasResult: boolean = false;  

  protected dashboard: Dashboard = new Dashboard();

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private dashboardService: DashboardService
  ) { 

    
    this.success = false;
    this.hasResult = false;
  }

  ngOnInit() {
   
    this.loadDashboard();
    
  }


  private loadDashboard() {

    this.messageService.isLoadingData = true;
    
    this.hasResult = false;
    this.success = false;////////////////

    this.dashboardService.getDashboard().subscribe(dash => {

      this.messageService.isLoadingData = false;
    
      this.dashboard = dash;     

      this.hasResult = true;
      this.success = true;

    
      
    });
  }


  itemTransactionAction(content: Transaction) {

    content.transactionUId = '1';
    
    this.router.navigate(['../transaction-detail/' + content.transactionUId ]);
  }

  itemAccountAction(content: Account) {

    content.accountUId = '1';
    
    this.router.navigate(['../transaction-detail/' + content.accountUId ]);
  }
 
}
