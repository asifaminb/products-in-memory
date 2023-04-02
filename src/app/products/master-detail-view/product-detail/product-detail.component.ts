import { Component } from '@angular/core';
import {ProductsService} from "../../service/products.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  selectedProduct$ = this.productsService.selectedProduct$;

  selectedSupplier$ = this.productsService.selectedProductSuppliers$

  constructor(private productsService: ProductsService) {
  }
}
