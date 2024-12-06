import { Injectable } from '@angular/core';
import { IShoopingCartItem } from '../model/IShoopingCartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:IShoopingCartItem[];
  private totalPrice:number;
  constructor() {
    this.cart = [];
    this.totalPrice = 0;
  }

  getCart(): IShoopingCartItem[]{
    return this.cart;
  }

  getCartLength(): number{
    return this.cart.length;
  }

  setCart(cart: IShoopingCartItem[]): void{
    this.cart = cart;
  }

  getTotalPrice(): number{
    return this.totalPrice;
  }

  setTotalPrice(totalPrice: number): void{
    this.totalPrice = totalPrice;
  }

  checkPurchasedProduct(event: IShoopingCartItem): void{
    let index = this.cart.findIndex((product) => product.id == event.id);
    if(index == -1){
      this.cart.push(event);
    }else{
      this.cart[index].quantity += event.quantity;
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice():void{
    this.totalPrice = 0;
    this.cart.forEach((product) => {
      this.totalPrice += product.price * product.quantity;
    })

    this.totalPrice += this.totalPrice * 0.14;
  }
}
