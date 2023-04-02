import { Component } from '@angular/core';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.css']
})
export class ProductShellComponent {

  productSelected($event: any) {
    console.log($event);
  }



}
