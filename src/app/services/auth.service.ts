import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../model/IUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject: BehaviorSubject<IUser | null>;
  constructor(
    private router: Router
  ) {
    this.authSubject = new BehaviorSubject<IUser | null>(null);
  }

  login(username: string, password: string){
    let user: IUser = {
      username: username,
      password: password,
      nid: 30110172100699,
    }

    localStorage.setItem('user', JSON.stringify(user));
    this.authSubject.next(user);
    this.router.navigate(['/']);
  }

  logout(){
    localStorage.removeItem('user');
    this.authSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUser(): Observable<IUser | null>{
    let currentUser = localStorage.getItem('user');
    if(currentUser){
      this.authSubject.next(JSON.parse(currentUser));
    }else{
      this.authSubject.next(null);
    }
    return this.authSubject.asObservable();
  }

}
