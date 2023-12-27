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


@Injectable({
    providedIn: 'root'
  })
export class DashboardService extends BaseService {

    public getDashboard() {
        const url = `${environment.SERVER_HOST}/api/dashboard/`;
        return this.http.get<Dashboard>(url).pipe();
    }
}