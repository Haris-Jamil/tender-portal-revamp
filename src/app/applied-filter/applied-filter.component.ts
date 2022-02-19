import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-applied-filter',
  templateUrl: './applied-filter.component.html',
  styleUrls: ['./applied-filter.component.css']
})
export class AppliedFilterComponent implements OnInit, OnChanges {

  @Input() filterObj: any;
  filters: string[] = [];

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filterObj.currentValue) {
      this.filters = Object.keys(this.filterObj).map( (key) => {
        return `${key}: ${this.filterObj[key]}`
      });      
    }
  }

  ngOnInit(): void {
  }

}
