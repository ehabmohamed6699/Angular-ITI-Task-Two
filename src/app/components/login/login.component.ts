import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/model/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { RoutesTrackService } from 'src/app/services/routes-track.service';
import { IViewUser } from 'src/app/viewModels/IViewUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('email') email!:ElementRef;
  @ViewChild('password') password!:ElementRef;
  error: string = '';

  private subscriptions: Subscription[];
  constructor(
    private authService: AuthService,
    private routesTrackService: RoutesTrackService
  ) {
    this.subscriptions = [];
  }

  login(){
    // this.authService.login(String(this.username.nativeElement.value), String(this.password.nativeElement.value));
    let options = {
      next: (value: IViewUser) => {
        console.log(value);
      },
      error: (error: Error) => {
        this.error = error.message;
      }
    }
    this.authService.login(String(this.email.nativeElement.value), String(this.password.nativeElement.value)).subscribe(options)
  }
  ngOnInit(): void {
  }

}
