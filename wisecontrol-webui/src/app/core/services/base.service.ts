import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {

    protected readonly httpOptions = {headers: {'Content-Type': 'application/json'}};

    
    protected readonly httpOptionsNoCache = {headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 
    Pragma: 'no-cache'}};

    protected httpOptionsNoCacheWithJWTAuthentication() {
      
      let token = '';

      this.authService.init();

      if(this.authService.signedUserToken != null) {
        token = this.authService.signedUserToken?.token;
      }
    
      var headers = {headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', Pragma: 'no-cache'}};

      return headers;
    }


    constructor(
      protected messageService: MessageService,
      protected authService: AuthService,
      protected router: Router,
      protected http: HttpClient) {
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
