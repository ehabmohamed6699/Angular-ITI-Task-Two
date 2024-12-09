import { Injectable } from '@angular/core';
import { ICategory } from '../model/ICategory';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // private categoriesList: ICategory[];
  private selectedCategory: string = "0";
  constructor(
    private httpClient: HttpClient
  ) {
    // this.categoriesList = [
    //   {id: 1, name: 'Electronics'},
    //   {id: 2, name: 'Clothes'},
    //   {id: 3, name: 'Shoes'},
    // ]
  }

  // getCategories(): ICategory[]{
  //   return this.categoriesList;
  // }
  setSelectedCategory(categoryID: string): void{
    this.selectedCategory = categoryID;
  }
  getSelectedCategory(): string{
    return this.selectedCategory;
  }
  getAll(): Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>(`${environment.api_url}categories`);
  }
}
