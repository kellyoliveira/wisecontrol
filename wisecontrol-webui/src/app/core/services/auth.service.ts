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
export class AuthService extends BaseService {

  private _userToken: UserToken = new UserToken();

  public get UserToken() {
    return this._userToken;
  }

  private _isSigning = false;
  public get isSigning() {
    return this._isSigning;
  }

  private _signedUser: User | null = null;
  public get signedUser() {
    return this._signedUser;
  }

  public signedUserChanged: EventEmitter<void> = new EventEmitter();

  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService,
    protected override router: Router) {
    super(messageService, router, http);
  }

  public get accessToken(): string | null{
    return localStorage.getItem('x-access_token');
  }

  private setAccessToken(value: string | null) {
    if (!value) {
      localStorage.removeItem('x-access_token');
      return;
    }
    localStorage.setItem('x-access_token', value);
  }

  public get refreshToken(): string | null {
    return localStorage.getItem('x-refresh_token');
  }

  private setRefreshToken(value: string | null) {
    if (!value) {
      localStorage.removeItem('x-refresh_token');
      return;
    }
    localStorage.setItem('x-refresh_token', value);
  }

  public get userName(): string | null {
    return localStorage.getItem('x-user_name');
  }

  private setUserName(value: string | null) {
    if (!value) {
      localStorage.removeItem('x-user_name');
      return;
    }
    localStorage.setItem('x-user_name', value);
  }



  get isAuthenticated(): boolean {
    return this.signedUser !== null;
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
                return;
            }
        
   
            // store tokens
            this.storeToken(r);

        }
    });

    
  }

  /**
   * Store response tokens locally
   * @param response the http response with tokens
   */
  private storeToken(userToken: UserToken) {
    
    this._userToken = userToken;
    
    if (userToken.token) {
      this.setAccessToken(userToken.token);
    }

    if (userToken.expiration) {
      this.setRefreshToken(userToken.expiration);
    }
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

    this._signedUser = null;
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setUserName(null);

    this.signedUserChanged.emit();
    this.messageService.isLoadingData = false;
    
  }

  async logout() {
    await this.logoutSilent();
    this.router.navigate(['/login']);
  }


  /*async setUserInfo() {
    
    const response = this.http.get<User>(environment.SERVER_HOST + '/api/auth/identity/', userCredential, this.httpOptions).subscribe({
      next: (r) => {
          // if failed, tries to refresh
          if (!r.token) {
              return;
          }
      
 
          // store tokens
          this.storeToken(r);

      }
  });

    const userInfo = await this.http.get(environment.SERVER_HOST + '/api/auth/_identity/' + this.userName).toPromise<User>(user)
      .catch(err => {
        this._signedUser = null;
        console.log('error getting user info');
      });

    if (userInfo) {
      this._signedUser = new User();
      //this._signedUser.email = userInfo.email;
    
    }
    
    this.signedUserChanged.emit();
  }*/

  public init() {
   
  }

  
  public hasToken() {
    if (localStorage.getItem("x-access_token") === null) {
      if (localStorage.getItem("x-refresh_token") === null) {
          return false;
    
      }
      
    } 

    return true;

  }

}
