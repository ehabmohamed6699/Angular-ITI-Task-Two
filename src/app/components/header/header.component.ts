import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/model/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user:IUser | null;
  services: Subscription[];
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.user = null;
    this.services = [];
    
  }
  ngOnDestroy(): void {
    this.services.forEach(service => {
      service.unsubscribe();
    })
  }

  getCartLength(): number{
    return this.cartService.getCartLength();
  }

  getTotalPrice(): number{
    return this.cartService.getTotalPrice();
  }
  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    let authSubscription = this.authService.currentUser.subscribe(subject => {
      this.user = subject;
    })

    this.services.push(authSubscription);
  }

}
