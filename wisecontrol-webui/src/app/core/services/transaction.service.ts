import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction, TransactionType } from '../view-models/transaction';
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
export class TransactionService extends BaseService {

  constructor(
    protected override messageService: MessageService,
    protected override authService: AuthService,
    protected override router: Router,
    protected override http: HttpClient) {
    super(messageService, authService, router, http);
  }

  public getTransaction(transactionId: string) {
    const url = `${environment.SERVER_HOST}/api/transactions/` + transactionId;
    return this.http.get<Transaction>(url, this.httpOptionsNoCacheWithJWTAuthentication()).pipe();
  }

  
  public getTransactions() : Observable<List<Transaction>> {
    const url = `${environment.SERVER_HOST}/api/transactions/`;
    
    return this.http.get<List<Transaction>>(url, this.httpOptionsNoCacheWithJWTAuthentication()).pipe();
  }

  public deleteTransaction(transaction: Transaction) {
    let urlService : string = environment.SERVER_HOST + '/api/transactions/' + transaction.transactionId;
    
    return this.http.delete(urlService, this.httpOptionsNoCacheWithJWTAuthentication());
  }

  
  public createTransactionDebit(transaction: Transaction): Observable<Transaction> {
    transaction.type = TransactionType.Debit;

    return this.http.post<Transaction>(environment.SERVER_HOST + '/api/transactions/', transaction, this.httpOptionsNoCacheWithJWTAuthentication());
  }


  public createTransactionCredit(transaction: Transaction): Observable<Transaction> {
    transaction.type = TransactionType.Credit;
    
    return this.http.post<Transaction>(environment.SERVER_HOST + '/api/transactions/', transaction, this.httpOptionsNoCacheWithJWTAuthentication());
  }

  public updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${environment.SERVER_HOST}/api/transactions/`, transaction, this.httpOptionsNoCacheWithJWTAuthentication());
  }

}

