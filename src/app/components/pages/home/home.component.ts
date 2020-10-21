import { CartService } from '../../../services/cart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Product} from '../../../model/Product';
import {  Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service'; 
import { MessengerService} from '../../../services/messenger.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  @Input() public product: Product;

  products: Product[] = [];

  pageActual:  number = 1;
  today:Date = new Date();

  subscription: Subscription;
  filteredProducts: any[] = [];
  search: any = [];
  showSearch: boolean = false;

  constructor(private cs: CartService,
              private ps: ProductsService,
              private messengerService:MessengerService,
              private router: Router
              ) {  }

               
  addProductCart(product_id){
    this.cs.updateProductInCart(product_id, 1);
    this.messengerService.add('added to cart!');

    this.router.navigate(['/cart']);
    }

     ngOnInit() {
      this.subscription = this.ps.getProducts()
        .subscribe((data: Product[]) => {
           this.filteredProducts = this.products = data;
      });
          }
   
       
     onCloseSearch() {
       this.showSearch = !this.showSearch;
            }
   
     filter(query: string) {
       this.filteredProducts = (query) ?
       this.products.filter(product => product.ProductName.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : 
       this.products;
       }
   

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
     }
   }  
 


