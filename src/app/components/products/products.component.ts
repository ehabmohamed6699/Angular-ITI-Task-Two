import { Component, Input,EventEmitter, OnInit, Output } from '@angular/core';
import { DiscountAmount } from 'src/app/model/DiscountAmount.enum';
import { ICategory } from 'src/app/model/ICategory';
import { IProduct } from 'src/app/model/IProduct';
import { IShoopingCartItem } from 'src/app/model/IShoopingCartItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList:IProduct[];
  @Input() selectedCategory: number = 0;
  @Output() purchasedProduct: EventEmitter<IShoopingCartItem>;
  
  cart: IProduct[] = [];
  constructor(){
    this.purchasedProduct = new EventEmitter<IShoopingCartItem>();
    this.productsList = [
      {
        id: 1,
        name: 'Vivo V30',
        price: 20000,
        quantity: 10,
        img: "https://btech.com/media/catalog/product/2/6/2689ac6412d70f63e83a7e67153d3f36cb8cdb9e902ae6d9973711cab5d9f94a.jpeg?width=1000&store=en&image-type=image",
        categoryID: 1,
        discount: DiscountAmount.FIVE
      },
      {
        id: 2,
        name: 'Huawei MateBook X Pro',
        price: 150000,
        quantity: 1,
        img: "https://m.media-amazon.com/images/I/51J-GqFuXcL._AC_UF1000,1000_QL80_.jpg",
        categoryID: 1,
        discount: DiscountAmount.FIFTEEN
      },
      {
        id: 3,
        name: 'Nike Air Hoodie',
        price: 4000,
        quantity: 0,
        img: "https://domno-vintage.com/cdn/shop/products/50-Vintage-Nike-Air-Hoodie-1.jpg?v=1663334159&width=1000",
        categoryID: 2,
        discount: DiscountAmount.FIFTEEN
      },
      {
        id: 4,
        name: 'New Balance Hoodie',
        price: 3200,
        quantity: 20,
        img: "https://nb.scene7.com/is/image/NB/mt03558bk_nb_70_i?$pdpflexf2$&wid=440&hei=440",
        categoryID: 2
      },
      {
        id: 5,
        name: 'Nike Air Max',
        price: 5200,
        quantity: 0,
        img: "https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwbf35a0b2/nk/0e0/0/c/f/7/5/0e00cf75_091e_4e17_8d86_7a6360004b45.jpg",
        categoryID: 3,
        discount: DiscountAmount.FIVE
      },
      {
        id: 6,
        name: 'New Balance 574',
        price: 5200,
        quantity: 30,
        img: "https://res.cloudinary.com/archive-resale/f_auto,w_2048,q_auto/newbalance/images/new-arrivals-collection-24_06_07",
        categoryID: 3
      },
    ]
  }

  getProductsByCategory(): IProduct[]{
    if(this.selectedCategory == 0){
      return this.productsList;
    }
    return this.productsList.filter(p => p.categoryID == this.selectedCategory);
  }

  addToCart(product: IProduct){
    if(product.quantity > 0){
      // product.quantity--;
      this.purchasedProduct.emit({
        id: product.id,
        name: product.name,
        price: this.getFinalPrice(product),
        quantity: 1
      })
    }
  }

  checkout(cart: IShoopingCartItem[]): boolean{
    for (let product of cart) {
      let index = this.productsList.findIndex((p) => p.id == product.id);
      if (this.productsList[index].quantity < product.quantity) {
        return false;
      }
    }

    cart.forEach((product) => {
      let index = this.productsList.findIndex((p) => p.id == product.id);
      this.productsList[index].quantity -= product.quantity;
    })
    return true;
  }

  getFinalPrice(product: IProduct): number{
    return product.price - (product.price * Number(product?.discount || 0) / 100);
  }

  ngOnInit(): void {
  }

}
