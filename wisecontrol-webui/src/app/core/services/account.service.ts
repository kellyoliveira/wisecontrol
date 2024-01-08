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
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AccountService extends BaseService {

  constructor(
    protected override messageService: MessageService,
    protected override authService: AuthService,
    protected override router: Router,
    protected override http: HttpClient) {
    super(messageService, authService, router, http);
  }


  public getAccounts() : Observable<List<Account>> {
    const url = `${environment.SERVER_HOST}/api/accounts/`;
    
    return this.http.get<List<Account>>(url, this.httpOptionsNoCacheWithJWTAuthentication()).pipe();
  }

  public getAccount(accountUId: string) {
    const url = `${environment.SERVER_HOST}/api/accounts/` + accountUId;
    return this.http.get<Account>(url, this.httpOptionsNoCacheWithJWTAuthentication()).pipe();
  }



  public saveAccount(account: Account): Observable<Account> {
    if (account.accountId) {
      return this.updateAccount(account);
    }
    return this.createAccount(account);
  }

  public deleteAccount(account: Account) {
    let urlService : string = environment.SERVER_HOST + '/api/accounts/' + account.accountId;
    
    return this.http.delete(urlService, this.httpOptionsNoCacheWithJWTAuthentication());
  }

  
  public createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(environment.SERVER_HOST + '/api/accounts/', account, this.httpOptionsNoCacheWithJWTAuthentication());
  }

  public updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${environment.SERVER_HOST}/api/accounts/`, account, this.httpOptionsNoCacheWithJWTAuthentication());
  }

}
