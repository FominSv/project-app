import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  angForm: FormGroup;

   

  constructor(private fb: FormBuilder, 
             private ps: ProductsService,
             private router: Router
            ) {
             this.createForm();
  }
  
  ngOnInit(): void {
  }

 
   
    createForm() {
      this.angForm = this.fb.group({
        ProductName: ['', [Validators.required]],
        ProductDescription: ['', [Validators.required]],
        ProductPrice: ['', [Validators.required]],
        ProductImage: ['', Validators.required ]
      });


  }
  addProduct(ProductName, ProductDescription, ProductPrice, ProductImage) {
    this.ps.addProductService(ProductName, ProductDescription, ProductPrice, ProductImage);
    
    this.router.navigate(['/products']);
  }
      

}
