import { Component, OnInit, Input ,  OnDestroy} from '@angular/core';
import { CartItem } from '../../../model/CartItem';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit, OnDestroy{

  products: CartItem[] = [];
 
  cartSubscription: Subscription;

  total: number=0;
  items: CartItem[];
  shopingCartItemCount: number;
  
 
 
  constructor(private cs:CartService ) { 
     
      }

     
ngOnInit(): void {
  
  this.cartSubscription = this.cs.getProducts()
  .subscribe((data: CartItem[]) => {
    this.products = data;
    this.cartItemCount();
    this.totalPrice();
     });
    }

         
   
deleteProduct(id) {
  this.cs.deleteProduct(id).subscribe(data => {
    this.cs.getProducts().subscribe((data:CartItem[]) => {
        this.products = data;
        this.totalPrice();
      });
      console.log('Product Deleted from Cart!');
  });
}


cartItemCount(){
  this.shopingCartItemCount = 0;
 for (var i=0; i<this.products.length;i++){
   this.shopingCartItemCount +=  this.products[i].ProductQuantity;
  }
}


totalPrice(){
  this.total = 0;
 for(var i=0;i<this.products.length;i++){
 this.total += (this.products[i].ProductPrice *
   this.products[i].ProductQuantity);
 }
}


 add(pid: string){
  console.log('Add +1 to product with name: ' + pid);
  for(var i=0;i<this.products.length;i++) {
    if(this.products[i].ProductName === pid)
    {
      console.log('Printing product');
      console.log(this.products[i]);
      const advancedCartObject = Object.assign({_id: 0}, this.products[i]);
      this.cs.updateProductInCart(advancedCartObject._id, this.products[i].ProductQuantity+1);
      this.products[i].ProductQuantity += 1;
    }
  }
  this.totalPrice();
  this.cartItemCount();
  console.log(this.products);
 
}


del(pid: string){
  console.log('Removing -1 to product with name: ' + pid);
  for(var i=0;i<this.products.length;i++) {
    if(this.products[i].ProductName === pid)
    {
        console.log('Printing product');
        console.log(this.products[i]);
        const advancedCartObject = Object.assign({_id: 0}, this.products[i]);
        if (this.products[i].ProductQuantity === 1) {
          this.deleteProduct(advancedCartObject._id);
        } else {
          this.cs.updateProductInCart(advancedCartObject._id, this.products[i].ProductQuantity-1);
          this.products[i].ProductQuantity -= 1;
         
        }
    }
  }
  this.totalPrice();
  console.log(this.products);
  this.cartItemCount();
}

ngOnDestroy() {
  this.cartSubscription.unsubscribe();
}
}

    


