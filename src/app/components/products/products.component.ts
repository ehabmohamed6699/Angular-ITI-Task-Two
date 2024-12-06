import { Component, Input,EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
export class ProductsComponent implements OnInit {
  
  @Input() selectedCategory: number = 0;
  @Output() purchasedProduct: EventEmitter<IShoopingCartItem>;
  
  cart: IProduct[] = [];
  constructor(
    private productsService: ProductsService,
    private router: Router
  ){
    this.purchasedProduct = new EventEmitter<IShoopingCartItem>();
  }

  
  checkout(cart: IShoopingCartItem[]): boolean{
    return this.productsService.checkout(cart);
  }

  getProductsByCategory(): IProduct[]{
    return this.productsService.getProductsByCategory(this.selectedCategory);
  }

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

  viewProductDetails(id: number){
    this.router.navigate(['products', id])
  }

  ngOnInit(): void {
  }

}
