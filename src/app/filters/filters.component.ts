import { Subscription } from "rxjs";
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() public queryFilters: EventEmitter<any> = new EventEmitter<any>();

  private filterSub$: Subscription;

  constructor(private fb: FormBuilder) {
    this.filters = new FormGroup({
      from_price: new FormControl(''),
      to_price: new FormControl(''),
      manufacturer_id: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ]),
      kind: new FormControl(''),
    });
  }

  public filters: FormGroup;

  ngOnInit(): void {
    this.filterSub$ = this.filters.valueChanges
      .subscribe(
        (formData) => this.queryFilters.emit(formData)
      );
  }

  ngOnDestroy() {
    if (this.filterSub$) {
      this.filterSub$.unsubscribe();
    }
  }

}
