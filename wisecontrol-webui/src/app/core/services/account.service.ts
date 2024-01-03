import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from '../view-models/account';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { List } from '../view-models/list';

@Injectable({
    providedIn: 'root'
  })
export class AccountService extends BaseService {

  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService,
    protected override router: Router) {
    super(messageService, router, http);
  }


  public getAccounts() : Observable<List<Account>> {
    const url = `${environment.SERVER_HOST}/api/accounts/`;
    
    return this.http.get<List<Account>>(url).pipe();
  }

  public getAccount(accountUId: string) {
    const url = `${environment.SERVER_HOST}/api/accounts/` + accountUId;
    return this.http.get<Account>(url).pipe();
  }



  public saveAccount(account: Account): Observable<Account> {
    if (account.accountId) {
      return this.updateAccount(account);
    }
    return this.createAccount(account);
  }

  public deleteAccount(account: Account) {
    let urlService : string = environment.SERVER_HOST + '/api/accounts/' + account.accountId;
    
    return this.http.delete(urlService, this.httpOptions);
  }

  
  public createAccount(account: Account): Observable<Account> {
    
    alert(account.description);
    return this.http.post<Account>(environment.SERVER_HOST + '/api/accounts/', account, this.httpOptions);
  }

  public updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${environment.SERVER_HOST}/api/accounts/`, account, this.httpOptions);
  }

}
