import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/model/ICategory';
import { IShoopingCartItem } from 'src/app/model/IShoopingCartItem';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {
  categoriesList: ICategory[];
  selectedCategory: number = 0;
  cart:IShoopingCartItem[];
  @ViewChild('categorySelect') categorySelect !: ElementRef;
  @ViewChild(ProductsComponent) productsComponent !: ProductsComponent;
  totalPrice: number;
  constructor() {
    this.categoriesList = [
      {id: 1, name: 'Electronics'},
      {id: 2, name: 'Clothes'},
      {id: 3, name: 'Shoes'},
    ]
    this.cart = [];
    this.totalPrice = 0;
  }
  ngAfterViewInit(): void {
    this.categorySelect.nativeElement.classList.add('select-primary');
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

  getValue(event: Event): string{
    return (event.target as HTMLInputElement).value;
  }

  calculateTotalPrice():void{
    this.cart.forEach((product) => {
      this.totalPrice += product.price * product.quantity;
    })

    this.totalPrice += this.totalPrice * 0.14;
  }

  checkout():void{
    if (this.productsComponent.checkout(this.cart)){
      this.cart = [];
      this.totalPrice = 0;
    }
  }
  ngOnInit(): void {
  }

}
