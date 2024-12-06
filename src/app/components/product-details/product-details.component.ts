import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/model/IProduct';
import { ProductsService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct | null = null;
  isLastProduct: boolean = false;
  isFirstProduct: boolean = false;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      let id = Number(param.get('id'));
      this.product = this.productsService.getProductById(id) || null;
      this.isLastProduct = this.productsService.isLastProduct(id);
      this.isFirstProduct = this.productsService.isFirstProduct(id);
    })
  }

  getFinalPrice(product: IProduct | null): number {
    return this.productsService.getFinalPrice(product as IProduct);
  }

  goBack() {
    this.location.back();
  }

  goPrev(){
    let prevID = this.productsService.getPrevProductID(this.product?.id || 0);
    if(prevID){
      this.router.navigate(['products', prevID]);
    }
  }

  goNext(){
    let nextID = this.productsService.getNextProductID(this.product?.id || 0);
    if(nextID){
      this.router.navigate(['products', nextID]);
    }
  }

}
