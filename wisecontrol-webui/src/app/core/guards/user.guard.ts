import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
    constructor(private router: Router, private authService: AuthService) {}

  
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        this.authService.init();

        var canActivate = this.authService.isAuthenticated;
        
        if(!canActivate) {
            this.router.navigate(['/login']);

        }

        return canActivate;
    }
}