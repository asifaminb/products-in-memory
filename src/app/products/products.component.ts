import { Component } from '@angular/core';
import {ProductsService} from "./service/products.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, filter, forkJoin, map, mergeMap, Observable, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productsService.productsWithAdd$,
    this.categorySelectedAction$
  ])
    .pipe(
      map(([products, selectedCategoryId]) =>
        products.filter(product =>
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
        )),
      tap((data) => console.log(data)),
    );

  categories$ = this.productsService.productCategories$


 constructor(
   private productsService: ProductsService,
   private http: HttpClient) {
 }


  onSelected(categoryId: string) {
   this.categorySelectedSubject.next(parseInt(categoryId));
  }
}
