import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, Subscription, tap, throwError } from 'rxjs';
import { IUser } from '../model/IUser';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { error } from 'console';
import { IViewUser } from '../viewModels/IViewUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
  private authSubject: BehaviorSubject<IUser | null>;
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.authSubject = new BehaviorSubject<IUser | IViewUser | null>(null);
  }

  register(user: IUser):Observable<IUser>{
    return this.httpClient.post<IUser>(`${environment.api_url}users`, user, this.headerOptions);
  }

  login(email: string, password: string): Observable<IViewUser>{
    return this.httpClient.get<IUser[]>(`${environment.api_url}users?email=${email}&password=${password}`, this.headerOptions).pipe(
      map(users => {
        if(users.length > 0 && users[0].email === email && users[0].password === password){
          let user = {...users[0], token: Math.random().toString(36)};
          return user;
        }else{
          throw new Error('Invalid email or password');
        }
      }),
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.authSubject.next(user);
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message))
      })
    )
  }

  emailExists(email: string): Observable<boolean>{
    return this.httpClient.get<IUser[]>(`${environment.api_url}users?email=${email}`, this.headerOptions).pipe(
      map(users => users.length > 0)
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.authSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedSubject(): Observable<boolean>{
   return this.authSubject.asObservable().pipe(
    map(user => user !== null),
   )
  }

  get isLogged():boolean{
    return this.authSubject.value !== null;
  }

  // login(email: string, password: string){
  //   let user: IUser = {
  //     fullName: username,
  //     password: password,
  //     nid: 30110172100699,
  //   }

  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.authSubject.next(user);
  //   this.router.navigate(['/']);
  // }

  // logout(){
  //   localStorage.removeItem('user');
  //   this.authSubject.next(null);
  //   this.router.navigate(['/login']);
  // }

  get currentUser(): Observable<IViewUser | null>{
    let currentUser = localStorage.getItem('user');
    if(currentUser){
      this.authSubject.next(JSON.parse(currentUser));
    }else{
      this.authSubject.next(null);
    }
    return this.authSubject.asObservable();
  }

}
