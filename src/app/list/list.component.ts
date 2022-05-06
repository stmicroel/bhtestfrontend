import { Component, Input, OnInit } from '@angular/core';

import { IProduct } from "../interfaces/product";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public _products: IProduct[] = [];

  @Input() public set products(products: IProduct[]) {
    console.log(products);
    this._products = products;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
