import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { IProduct } from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public list(queryParams: any = {}): Observable<IProduct[]>
  {
    let uri = '';
    const filterParams = ['from_price', 'to_price', 'manufacturer_id', 'kind'];
    const targetFilterParams = filterParams
      .filter(
        (param) => queryParams.hasOwnProperty(param) && queryParams[param] != '' && queryParams[param] != null
      );

    targetFilterParams.forEach((param) => {
      if (!(queryParams[param] instanceof Array)) {
        uri += `${param}=${queryParams[param]}&`;
      } else {
        queryParams[param].forEach((value: boolean, index: number) => {
          if (value) {
            uri += `${param}[]=${index}&`;
          }
        });
      }
    })

    return this.http.get('http://backend.local/api/products?' + uri) as Observable<IProduct[]>;
  }
}
