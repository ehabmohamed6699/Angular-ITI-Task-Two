import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/model/ICategory';
import { CategoriesService } from 'src/app/services/categories-service.service';
import { ProductsService } from 'src/app/services/products-service.service';
import { IViewProduct } from 'src/app/viewModels/IViewProduct';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnChanges, OnDestroy {
  product: IViewProduct = {} as IViewProduct;
  categories: ICategory[] = [];
  private subscriptions: Subscription[] = [];
  error: string = '';
  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private router: Router
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

}
