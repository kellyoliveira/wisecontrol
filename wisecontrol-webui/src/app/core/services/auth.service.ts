import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { UserCredential } from '../view-models/userCredential';
import { User } from '../view-models/user';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { UserToken } from '../view-models/userToken';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected readonly httpOptions = {headers: {'Content-Type': 'application/json'}};

  private _isSigning = false;
  public get isSigning() {
    return this._isSigning;
  }

  private _signedUserToken: UserToken | null = null;
  public get signedUserToken() {
    return this._signedUserToken;
  }

  public setSignedUserToken(signedUserToken: UserToken | null) {
    this._signedUserToken = signedUserToken;
    this.storeSignedUserToken();
    this.signedUserChanged.emit();
  }

  public get signedUserTokenStored(): string | null{
    return localStorage.getItem('x-access_token');
  }

  private storeSignedUserToken() {
    if (!this.signedUserToken) {
      localStorage.removeItem('x-access_token');
      return;
    }
    localStorage.setItem('x-access_token', JSON.stringify(this.signedUserToken));
  }

  get isAuthenticated(): boolean {
    return this.signedUserToken !== null;
  }  


  public signedUserChanged: EventEmitter<void> = new EventEmitter();

  constructor(
    protected http: HttpClient,
    protected messageService: MessageService,
    protected router: Router) {
  }

  
  
  
  /**
   * Starts oAuth work flow to sign in an user
   */
  async signin(userCredential:UserCredential) {


    // starts oAuth flow
    const response = this.http.post<UserToken>(environment.SERVER_HOST + '/api/auth/login/', userCredential, this.httpOptions).subscribe({
        next: (r) => {
            // if failed, tries to refresh
            if (!r.token) {
                this.clearAuthData();
                return;
            }
            
   
            // store tokens
            this.setSignedUserToken(r);

            

            

      },
      error: (err) => {
          this.clearAuthData();
      },
    });

    
  }

  

  private clearAuthData() {
    this.setSignedUserToken(null);
  
  }

  /**
   * Logout the curent user.
   */
  async logoutSilent() {
    this.messageService.blockUI();
    this.messageService.isLoadingData = true;

    await this.http.get(environment.SERVER_HOST + '/auth/LogoutSilent', { withCredentials: true, responseType: 'text' }).toPromise()
      .catch(err => {
        console.log('erro**');
        console.log(err);
      });

    this.clearAuthData();

    this.messageService.isLoadingData = false;
    
  }

  async logout() {
    await this.logoutSilent();
    this.router.navigate(['/login']);
  }


  
  public init() {

    if(this.signedUserToken == null) {
      if(this.signedUserTokenStored != null) {
        this.setSignedUserToken(JSON.parse(this.signedUserTokenStored));

      }

    }
  }

  
  public hasToken() {
    if (localStorage.getItem("x-access_token") === null) {
      return false;
    } 

    return true;

  }

}
