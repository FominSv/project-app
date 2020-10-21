import { DetailsComponent } from './components/cart_components/details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationStart,
NavigationEnd, NavigationError, NavigationCancel,
 Event, Router} from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import {AboutComponent} from './components/pages/about/about.component';
import {ContactComponent} from './components/pages/contact/contact.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductGetComponent } from './components/product-get/product-get.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { CartComponent } from './components/cart_components/cart/cart.component';
import { SuccessComponent } from './components/cart_components/success/success.component';





const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contact', component: ContactComponent},

  {path: 'product/create',component: ProductAddComponent },
  {path: 'products',component: ProductGetComponent},
  {path: 'edit/:id', component:ProductEditComponent},
  
  
   
  {path: 'cart', component: CartComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'success', component: SuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
