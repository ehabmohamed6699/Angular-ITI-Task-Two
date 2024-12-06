import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/IUser';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:IUser;
  constructor(
    private cartService: CartService
  ) {
    this.user = {
      name: 'Ehab',
      nid: 30110172100699
    }
  }

  getCartLength(): number{
    return this.cartService.getCartLength();
  }

  getTotalPrice(): number{
    return this.cartService.getTotalPrice();
  }

  ngOnInit(): void {
  }

}
