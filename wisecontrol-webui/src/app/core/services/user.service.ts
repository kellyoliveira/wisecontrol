import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../view-models/user';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class UserService extends BaseService {
    
    public createUser(user: User): Observable<User> {
        return this.http.post<User>(environment.SERVER_HOST + '/api/auth/createuser', user, this.httpOptions);
    }
}