import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/model/ICategory';
import { IShoopingCartItem } from 'src/app/model/IShoopingCartItem';
import { ProductsComponent } from '../products/products.component';
import { CartService } from 'src/app/services/cart-service.service';
import { CategoriesService } from 'src/app/services/categories-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('categorySelect') categorySelect !: ElementRef;
  @ViewChild(ProductsComponent) productsComponent !: ProductsComponent;

  categories: ICategory[];
  selectedCategory: string = this.categoriesService.getSelectedCategory();

  totalPrice: number = this.cartService.getTotalPrice();
  cart: IShoopingCartItem[] = this.cartService.getCart();
  private subscriptions: Subscription[];
  constructor(
    private cartService: CartService,
    private categoriesService: CategoriesService
  ) {
    this.categories = [];
    this.subscriptions = [];
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
  ngOnInit(): void {
    this.subscriptions.push(this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    }))
    // this.categories = this.categoriesService.getCategories();
    this.selectedCategory = this.categoriesService.getSelectedCategory();
    this.totalPrice = this.cartService.getTotalPrice();
    this.cart = this.cartService.getCart();
  }
  ngAfterViewInit(): void {
    this.categorySelect.nativeElement.classList.add('select-primary');
  }
  
  calculateTotalPrice(): void{
    this.cartService.calculateTotalPrice();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  checkPurchasedProduct(event: IShoopingCartItem): void{
    this.cartService.checkPurchasedProduct(event);
    this.calculateTotalPrice();
  }

  getValue(event: Event): string{
    return (event.target as HTMLInputElement).value;
  }

  

  // checkout():void{
  //   if (this.productsComponent.checkout(this.cartService.getCart())){
  //     this.cartService.setCart([]);
  //     this.cartService.setTotalPrice(0);
  //     this.cart = this.cartService.getCart();
  //   }
  // }

}
