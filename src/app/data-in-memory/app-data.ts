import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
import {ProductCategoryData} from "./product-category-data";
import {SupplierData} from "./supplier-data";

export class AppData implements InMemoryDbService {

  createDb(): { products: any, productCategories: any, suppliers: any } {
    const products = ProductData.products;
    const productCategories = ProductCategoryData.categories;
    const suppliers = SupplierData.suppliers;
    return { products, productCategories, suppliers };
  }
}
