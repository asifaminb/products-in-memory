import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest, filter,
  forkJoin,
  map,
  merge,
  Observable,
  of,
  scan,
  Subject,
  switchMap,
  tap
} from "rxjs";

interface Product {
  id: number;
  productName: string;
  productCode?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  category?: string;
  quantityInStock?: number;
  searchKey?: string[];
  supplierIds?: number[];
}

interface Supplier {
  id: number;
  name: string;
  cost: number;
  minQuantity: number;
}


interface Categories {
  id: number;
  name: string;
  description?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'api/products';
  private suppliersUrl = 'api/suppliers';
  private productCategoriesUrl = 'api/productCategories';

  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedAction$ = this.productSelectedSubject.asObservable();


  private productInsertedSubject = new Subject<Product>();
  productInsertedAction$ = this.productInsertedSubject.asObservable();


  products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(data => console.log('Products: ', JSON.stringify(data))),
    );

  productCategories$ = this.http.get<Categories[]>(this.productCategoriesUrl)
    .pipe(
      tap(data => console.log('categories', JSON.stringify(data))),
    );

  suppliers$ = this.http.get(this.suppliersUrl)
    .pipe(
      tap(data => console.log('suppliers', JSON.stringify(data))),
    );


  productsWithCategory$ = combineLatest([
    this.products$,
    this.productCategories$
  ]).pipe(
    map(([products, categories]) =>
      products.map((product) => ({
        ...product,
        price: product.price ? product.price * 1.5 : 0,
        category: categories.find((c: { id: any; }) => product.categoryId === c.id)?.name,
        searchKey: [product.productName]
      }))
    ),
  );

  productsWithAdd$ = merge(
    this.productsWithCategory$,
    this.productInsertedAction$
  ).pipe(
    scan((acc, value) =>
      (value instanceof Array) ? [...value] : [...acc, value], [] as Product[])
  )

  selectedProduct$ = combineLatest([
    this.productsWithCategory$,
    this.productSelectedAction$
  ]).pipe(
    map(([products , selectedProductId]) =>  products.find((product) => product.id === selectedProductId ) ),
     tap(product => console.log('selectedProduct', product)),
  )


  selectedProductSuppliers$ = this.selectedProduct$
    .pipe(
      switchMap(selectedProduct => {
        if (selectedProduct?.supplierIds) {
          return forkJoin(selectedProduct.supplierIds.map(supplierId =>
            this.http.get<Supplier>(`${this.suppliersUrl}/${supplierId}`)))
        } else {
          return of([]);
        }
      }),
      tap(suppliers => console.log('product suppliers', JSON.stringify(suppliers)))
    );

  selectedProductChanged (selectedProduct: number) {
    this.productSelectedSubject.next(selectedProduct)
  }

  constructor(private http: HttpClient) { }




}
