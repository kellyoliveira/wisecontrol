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


@Injectable({
    providedIn: 'root'
  })
export class TransactionService extends BaseService {

  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService,
    protected override router: Router) {
    super(messageService, router, http);
  }

  public getTransaction(transactionId: string) {
    const url = `${environment.SERVER_HOST}/api/transactions/` + transactionId;
    return this.http.get<Transaction>(url).pipe();
  }

  
  public getTransactions() : Observable<List<Transaction>> {
    const url = `${environment.SERVER_HOST}/api/transactions/`;
    
    return this.http.get<List<Transaction>>(url).pipe();
  }

  public deleteTransaction(transaction: Transaction) {
    let urlService : string = environment.SERVER_HOST + '/api/transactions/' + transaction.transactionId;
    
    return this.http.delete(urlService, this.httpOptions);
  }

  
  public createTransactionDebit(transaction: Transaction): Observable<Transaction> {
    transaction.transactionType = TransactionType.Debit;

    return this.http.post<Transaction>(environment.SERVER_HOST + '/api/transactions/', transaction, this.httpOptions);
  }


  public createTransactionCredit(transaction: Transaction): Observable<Transaction> {
    transaction.transactionType = TransactionType.Credit;
    
    return this.http.post<Transaction>(environment.SERVER_HOST + '/api/transactions/', transaction, this.httpOptions);
  }

  public updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${environment.SERVER_HOST}/api/transactions/`, transaction, this.httpOptions);
  }

}

