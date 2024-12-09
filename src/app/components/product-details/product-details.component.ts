import { Location } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/model/IProduct';
import { ProductsService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy, OnChanges {

  product: IProduct | null = null;
  id: string = "";
  error: string = "";
  private subscriptions: Subscription[];
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.subscriptions = [];
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe()
    })
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((param) => {
        let id = param.get('id');
        this.id = id || "";
        // this.product = this.productsService.getProductById(id) || null;
        // this.isLastProduct = this.productsService.isLastProduct(id);
        // this.isFirstProduct = this.productsService.isFirstProduct(id);
      })
    )

    this.subscriptions.push(
      this.productsService.getProductById(this.id as string).subscribe((data) => {
        this.product = data
      })
    )
  }

  getFinalPrice(product: IProduct | null): number {
    return this.productsService.getFinalPrice(product as IProduct);
  }

  goBack() {
    this.location.back();
  }

  delete(){
    let handler = {
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err: any) => {
        this.error = err.error.message;
      },
      complete: () => {}
    }
    this.subscriptions.push(
      this.productsService.delete(this.id).subscribe(handler)
    )
  }

  // goPrev(){
  //   let prevID = this.productsService.getPrevProductID(this.product?.id || 0);
  //   if(prevID){
  //     this.router.navigate(['products', prevID]);
  //   }
  // }

  // goNext(){
  //   let nextID = this.productsService.getNextProductID(this.product?.id || 0);
  //   if(nextID){
  //     this.router.navigate(['products', nextID]);
  //   }
  // }

}
