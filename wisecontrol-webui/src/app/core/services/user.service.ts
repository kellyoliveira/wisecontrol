import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../view-models/user';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class UserService extends BaseService {
 
    constructor(
        protected override messageService: MessageService,
        protected override authService: AuthService,
        protected override router: Router,
        protected override http: HttpClient) {
        super(messageService, authService, router, http);
      }

    public createUser(user: User): Observable<User> {
        return this.http.post<User>(environment.SERVER_HOST + '/api/auth/createuser', user, this.httpOptions);
    }
}