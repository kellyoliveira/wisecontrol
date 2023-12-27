import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {

    protected readonly httpOptions = {headers: {'Content-Type': 'application/json'}};

    
    protected readonly httpOptionsNoCache = {headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 
    Pragma: 'no-cache'}};


    constructor(
      protected messageService: MessageService,
      protected router: Router,
      protected http: HttpClient) {
    }

    /**
     * Gets a list of entities T from a REST service and its total count returned at the http.
     * @param url the REST service url
     * @param out the total count of records returned at the x-total-count header
     */
    protected getEntities<T> (constructor: () => T, url: string, out: (totalCount: number) => void): Observable<T[]> {
      this.messageService.isLoadingData = true;
      return this.http.get<T[]>(url, { observe: 'response'})
      .pipe(
        tap(() => { this.messageService.isLoadingData = false; }),
        map(res => {
          const entities = res.body!;
          for (let i = 0; i < entities.length; i++) {
            entities[i] = Object.assign(constructor.call, entities[i]);
          }

          if (out) {
            out(-1);
            const totalCountHeader = res.headers.get('x-total-count');
            if (totalCountHeader) {
              const totalCount = Number(totalCountHeader);
              if (!isNaN(totalCount)) {
                out(totalCount);
              }
            }
          }
          return entities;
       }),
       catchError(this.handleErrorAndContinue('getting records', []))
     );
   }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleErrorAndContinue<T> (operation = 'operation', result?: T, silent = false) {
    return (response: any): Observable<T> => {

      this.messageService.isLoadingData = false;

      console.error(response); // log to console instead

      // TODO: better job of transforming error for user consumption
      let msg = response.message;
      if (response.error && response.error.message) {
        msg = response.error.message;
      }
      if (!silent) {
        this.messageService.addError(msg + ' (' + operation + ')');
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
