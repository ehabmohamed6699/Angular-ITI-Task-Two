import { Component, Input,EventEmitter, OnInit, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiscountAmount } from 'src/app/model/DiscountAmount.enum';
import { ICategory } from 'src/app/model/ICategory';
import { IProduct } from 'src/app/model/IProduct';
import { IShoopingCartItem } from 'src/app/model/IShoopingCartItem';
import { ProductsService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy, OnChanges {
  
  @Input() selectedCategory: string = "0";
  @Output() purchasedProduct: EventEmitter<IShoopingCartItem>;
  products: IProduct[];
  cart: IProduct[] = [];
  private subscriptions: Subscription[];
  constructor(
    private productsService: ProductsService,
    private router: Router
  ){
    this.purchasedProduct = new EventEmitter<IShoopingCartItem>();
    this.products = [];
    this.subscriptions = [];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.selectedCategory == "0"){
      this.subscriptions.push(
        this.productsService.getAll().subscribe((data) => {
          this.products = data;
        })
      )
    }else{
      this.subscriptions.push(
        this.productsService.getProductsByCategory(this.selectedCategory).subscribe((data) => {
          this.products = data;
        })
      )
    }
    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe()
    })
  }
  
  ngOnInit(): void {
    
  }
  
  // checkout(cart: IShoopingCartItem[]): boolean{
  //   return this.productsService.checkout(cart);
  // }

  // getProductsByCategory(): IProduct[]{
  //   return this.productsService.getProductsByCategory(this.selectedCategory);
  // }

  getFinalPrice(product: IProduct): number{
    return this.productsService.getFinalPrice(product);
  }

  addToCart(product: IProduct){
    if(product.quantity > 0){
      // product.quantity--;
      this.purchasedProduct.emit({
        id: product.id,
        name: product.name,
        price: this.productsService.getFinalPrice(product),
        quantity: 1
      })
    }
  }

  viewProductDetails(id: string){
    this.router.navigate(['products', id])
  }


}
