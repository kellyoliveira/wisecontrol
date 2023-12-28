import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction } from '../view-models/transaction';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


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

  public getTransactions(out: (totalCount: number) => void) {
    const url = `${environment.SERVER_HOST}/api/transactions/`;
    

    return this.getEntities<Transaction>(() => new Transaction(), url, out).pipe(
      map(cs => {
        cs.forEach(c => { 
          
        });
        return cs;
      })
    );
  }

  public saveTransaction(transaction: Transaction): Observable<Transaction> {
    if (transaction.transactionId) {
      return this.updateTransaction(transaction);
    }
    return this.createTransaction(transaction);
  }

  

  public deleteTransaction(transaction: Transaction) {
    let urlService : string = environment.SERVER_HOST + '/api/transactions/' + transaction.transactionId;
    
    return this.http.delete(urlService, this.httpOptions);
  }

  
  public createTransaction(transaction: Transaction, shouldSetProfile : boolean = true): Observable<Transaction> {
    return this.http.post<Transaction>(environment.SERVER_HOST + '/api/transactions/', transaction, this.httpOptions);
  }

  public updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${environment.SERVER_HOST}/api/transactions/`, transaction, this.httpOptions);
  }

}

