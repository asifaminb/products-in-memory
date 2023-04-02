import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductShellComponent} from "./products/master-detail-view/product-shell/product-shell.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'details',
        component: ProductShellComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
