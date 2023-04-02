import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {AppData} from "./data-in-memory/app-data";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { ProductShellComponent } from './products/master-detail-view/product-shell/product-shell.component';
import { ProductListComponent } from './products/master-detail-view/product-list/product-list.component';
import { ProductDetailComponent } from './products/master-detail-view/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductShellComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 1000 }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
