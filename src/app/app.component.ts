import { Subscription } from "rxjs";
import { Component } from '@angular/core';

import { IProduct } from "./interfaces/product";
import { ProductService } from "./services/product.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testappfrontend';

  constructor(private productService: ProductService) {}

  public products: IProduct[] = [];
  private _productsSub$: Subscription;

  public ngOnInit() {
    this.getProductList();
  }

  public formChanged(values: any) {
    this.getProductList(values);
  }

  private getProductList(params = {}) {
    if (this._productsSub$) {
      this._productsSub$.unsubscribe();
    }

    this._productsSub$ = this.productService.list(params)
      .subscribe((response) => this.products = response);
  }

  // It never called because app component is main component but unsubscription must be
  public ngOnDestroy() {
    this._productsSub$.unsubscribe();
  }
}
