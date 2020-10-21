import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-product-edit',
  templateUrl:'./product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
 
  
  angForm: FormGroup;
  product: any = {};

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private ps: ProductsService,
              private fb: FormBuilder)
               {
     
               this.createForm();
              }

  // createForm() {
  //   this.angForm = this.fb.group({
  //     ProductName: ['', [Validators.required, Validators.pattern('^\s*[a-zA-Z]+$')]],
  //     ProductDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
  //     ProductPrice: ['', [Validators.required, Validators.required, Validators.pattern('^[0-9]+$')]],
  //     ProductImage: ['', Validators.required ]
  //   });
  // }

  createForm() {
    this.angForm = this.fb.group({
      ProductName: ['', [Validators.required]],
      ProductDescription: ['', [Validators.required]],
      ProductPrice: ['', [Validators.required]],
      ProductImage: ['', Validators.required ]
    });
  }

  updateProduct(ProductName, ProductDescription, ProductPrice, ProductImage) {
    this.route.params.subscribe(params => {
      this.ps.updateProduct(ProductName, ProductDescription, ProductPrice, ProductImage, params.id);
      this.router.navigate(['products']);
    });
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
        this.ps.editProduct(params['id']).subscribe(res => {
          this.product = res;
      });
    });
    this.getProductById(this.route.snapshot.params['id']);
  }
  
  getProductById(id){
    this.ps.editProduct(id).subscribe((data)=>{
      console.log(data);      
      this.product = data;
      this.angForm.setValue({
        prodName: this.product.prodName,
        prodDescription: this.product.prodDescription,
        prodPrice: this.product.prodPrice,
        prodImage: this.product.prodImage
      });
    });
  }
}