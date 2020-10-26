import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Product } from '../model/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }
 

  addProductService(ProductName, ProductDescription, ProductPrice, ProductImage) {
    const obj = {
      ProductName,
      ProductDescription,
      ProductPrice,
      ProductImage
    };    
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Added Successfuly' + res));
  }

  
  getProducts() {
    return this.http.get(`${this.uri}`);
  }

  
  editProduct(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
    }
    
    updateProduct(ProductName, ProductDescription, ProductPrice, ProductImage, id) {
      const obj = {
        ProductName,
        ProductDescription,
        ProductPrice,
        ProductImage
      };
      this.http.post(`${this.uri}/update/${id}`, obj)
        .subscribe(res => console.log('Product Updated'));

  }

 

  deleteProduct(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

   
  
 
}