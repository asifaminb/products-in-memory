import {Component, EventEmitter, Output} from '@angular/core';
import {ProductsService} from "../../service/products.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Output() selectedProduct = new EventEmitter();

  products$ = this.productsService.productsWithCategory$;


  constructor(private productsService: ProductsService) {
  }

  onProductSelect(id: number) {
    this.productsService.selectedProductChanged(id);
  }
}
