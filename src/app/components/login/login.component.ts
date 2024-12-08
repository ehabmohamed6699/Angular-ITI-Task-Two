import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RoutesTrackService } from 'src/app/services/routes-track.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username!:ElementRef;
  @ViewChild('password') password!:ElementRef;
  constructor(
    private authService: AuthService,
    private routesTrackService: RoutesTrackService
  ) { }

  login(){
    this.authService.login(String(this.username.nativeElement.value), String(this.password.nativeElement.value));
  }
  ngOnInit(): void {
  }

}
