import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-applied-filter',
  templateUrl: './applied-filter.component.html',
  styleUrls: ['./applied-filter.component.css']
})
export class AppliedFilterComponent implements OnInit, OnChanges {

  @Input() filterObj: any;
  filters: any[] = [];
  crossIcon = faTimes;

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filterObj.currentValue) {
      this.filters = Object.keys(this.filterObj)
        .filter( (key) => {
          return key !== 'mode'
        })
        .map( (key) => {
          // return `${key}: ${)}`
          return {
            name: key,
            data: this.clean(this.filterObj[key])
          }
        });
      delete this.filters['mode'];      
    }
  }

  removeFilter() {

  }

  clean(filterText) {
    filterText = filterText.replace(/undefined/g, '');
    filterText = filterText.split(',').filter(str => str.length);
    return filterText;
  }

  ngOnInit(): void {
  }

}
