import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction } from '../view-models/transaction';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Dashboard } from '../view-models/dashboard';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
  })
export class DashboardService extends BaseService {

    constructor(
        protected override messageService: MessageService,
        protected override authService: AuthService,
        protected override router: Router,
        protected override http: HttpClient) {
        super(messageService, authService, router, http);
      }

    public getDashboard() {
        const url = `${environment.SERVER_HOST}/api/dashboard/`;
        return this.http.get<Dashboard>(url, this.httpOptionsNoCacheWithJWTAuthentication()).pipe();
    }
}