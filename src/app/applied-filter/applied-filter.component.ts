import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-applied-filter',
  templateUrl: './applied-filter.component.html',
  styleUrls: ['./applied-filter.component.css']
})
export class AppliedFilterComponent implements OnInit, OnChanges {

  @Input() filterObj: any;
  @Output() emitRemoveFilter: EventEmitter<any> = new EventEmitter();
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
          return {
            name: key,
            data: this.clean(this.filterObj[key], key)
          }
        });
      delete this.filters['mode'];      
    }
  }

  format(name): string {
    if (name == "nilBid") {
      name = "BidSecurity";
    }
    return name.match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g).join(" ");
  }

  removeFilter(filterName, filter) {
    this.emitRemoveFilter.emit({
      'filterName': filterName,
      'filter': filter
    })
  }

  clean(filterText, key) {
    if (key == 'nilBid') {
      filterText = filterText ? 'No Bid Security' : 'With Bid Security';
      return [filterText];
    }
    filterText = filterText.replace(/undefined/g, '');
    filterText = filterText.split(',').filter(str => str.length);
    return filterText;
  }

  ngOnInit(): void {
  }

}
