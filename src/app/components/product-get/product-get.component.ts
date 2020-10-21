import { Component, OnInit } from '@angular/core';
import {ProductsService} from  '../../services/products.service';
import {Product} from '../../model/Product';
@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {


  products: Product[];
  constructor(private ps: ProductsService) { }

  ngOnInit() {
    this.ps.getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
    });
  }

  deleteProduct(id) {
    this.ps.deleteProduct(id).subscribe(data => {
      this.ps.getProducts().subscribe((data:Product[]) => {
          this.products = data;
        });
        console.log('Product Deleted!');
       
    });

  }
}