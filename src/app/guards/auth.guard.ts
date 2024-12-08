import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
  authorized: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.authService.currentUser.subscribe(user => {
      if(user){
        this.authorized = true;
      }else{
        this.authorized = false;
      }
    })
  }
  ngOnInit(): void {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      !this.authorized && this.router.navigate(['/login']);
      return this.authorized;
  }
  
}
