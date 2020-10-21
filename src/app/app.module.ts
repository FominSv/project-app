import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';

import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductGetComponent } from './components/product-get/product-get.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule  } from '@angular/common/http';

import { CartComponent } from './components/cart_components/cart/cart.component';
import { DetailsComponent } from './components/cart_components/details/details.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/pages/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CartInfoComponent } from './components/cart_components/cart-info/cart-info.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ClickOutsideModule } from 'ng-click-outside';
import { SuccessComponent } from './components/cart_components/success/success.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductAddComponent,
    ProductGetComponent,
    ProductEditComponent,
   
    CartComponent,
    DetailsComponent,
    FooterComponent,    
 
    CartInfoComponent, SuccessComponent

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbCollapseModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgbModule,
    ClickOutsideModule
  ],
  providers: [  ],

  bootstrap: [AppComponent]
})
export class AppModule {
 
}
