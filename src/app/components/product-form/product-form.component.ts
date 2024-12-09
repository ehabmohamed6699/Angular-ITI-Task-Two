import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/model/ICategory';
import { CategoriesService } from 'src/app/services/categories-service.service';
import { ProductsService } from 'src/app/services/products-service.service';
import { IViewProduct } from 'src/app/viewModels/IViewProduct';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges, OnDestroy {

  product: IViewProduct = {} as IViewProduct;
  categories: ICategory[] = [];
  private subscriptions: Subscription[] = [];
  error: string = '';
  editing: boolean = false;
  productID: string = '';
  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { 
    // this.categories = []
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.subscriptions.push(
      this.categoriesService.getAll().subscribe((categories: ICategory[]) => {
        this.categories = categories;
      })
    )
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  ngOnInit(): void {
    this.subscriptions.push(
      this.categoriesService.getAll().subscribe((categories: ICategory[]) => {
        this.categories = categories;
      })
    )

    this.subscriptions.push(
      this.activeRoute.paramMap.subscribe(param => {
        let id = param.get('id');
        if(id){
          this.editing = true;
          this.productID = id;
          this.subscriptions.push(
            this.productService.getProductById(id).subscribe((product: IViewProduct) => {
              this.product = product;
            })
          )
        }
      })
    )
  }

  addProduct(){
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
      this.productService.add(this.product).subscribe(handler)
    )
  }

  editProduct(){
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
      this.productService.update(this.productID, this.product).subscribe(handler)
    )
  }

  submit(){
    if(this.editing){
      this.editProduct();
    }else{
      this.addProduct();
    }
  }

}
