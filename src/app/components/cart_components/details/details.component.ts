import { ProductsService } from './../../../services/products.service';
import { CartService } from '../../../services/cart.service';
import{Product} from '../../../model/Product';
import { MessengerService} from '../../../services/messenger.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit{ 


  
  @Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
  })
   
  product: any = {};
    
   
    constructor(
      
      private route: ActivatedRoute,
      private cs: CartService,
      private messengerService:MessengerService,
      private ps: ProductsService,
      
    ) {}
  
    ngOnInit(): void {
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
    }
          )};
    
    
    addProductCart(product_id){
        this.cs.updateProductInCart(product_id, 1);
        this.messengerService.add('Added to cart!');
      }
  }