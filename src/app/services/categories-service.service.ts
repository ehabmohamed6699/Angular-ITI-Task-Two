import { Injectable } from '@angular/core';
import { ICategory } from '../model/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesList: ICategory[];
  private selectedCategory: number = 0;
  constructor() {
    this.categoriesList = [
      {id: 1, name: 'Electronics'},
      {id: 2, name: 'Clothes'},
      {id: 3, name: 'Shoes'},
    ]
  }

  getCategories(): ICategory[]{
    return this.categoriesList;
  }
  setSelectedCategory(categoryID: number): void{
    this.selectedCategory = categoryID;
  }
  getSelectedCategory(): number{
    return this.selectedCategory;
  }
}
