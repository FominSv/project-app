import { CartItem } from './../model/CartItem';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/Product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  uri = 'http://localhost:3000/products';
  uriCart = 'http://localhost:3000/carts';

  cartItems: CartItem[]= [];
  itemsChanged: EventEmitter<CartItem[]> = new EventEmitter<CartItem[]>(); 
  
  product: Product[];
  items: CartItem[];
  total: number;
  products: CartItem[] = [];

  constructor(private http: HttpClient) { 
                this.cartItems = [];
              }

     

   getProducts() {
        return this.http.get(`${this.uriCart}`);
  }
  
  deleteProduct(id) {
    return this.http.get(`${this.uriCart}/deleteCart/${id}`);
  }

      
         
    updateProductInCart(product_id, quantiny: number) {
      console.log('updateProductInCart log: Updating product with id: ' + product_id + ' to quantity: ' + quantiny);
      this.http.post(`${this.uriCart}/updateCart2`, {ProductId: product_id, ProductQty: quantiny})
        .subscribe(res => console.log('Product Add Successfuly' + res));
        
       
  }     


  

    }
  
    


 


    

  


