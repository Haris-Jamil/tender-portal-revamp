import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

interface filter {
  title: string,
  tenderNo: string
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  faCaretDown = faCaretDown;
  @Output() emitFilter: EventEmitter<any> = new EventEmitter();

  filterObj: filter = {
    title: '',
    tenderNo: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(): void {
    const appliedFilters = {};
    for( let key in this.filterObj ) {
      if (this.filterObj[key]) {
        appliedFilters[key] = this.filterObj[key];
      }
    }
    this.emitFilter.next(appliedFilters);
  }

  toggleFilterSection(e) {
    let clickEle = e.target;
    if (clickEle.localName === 'path' || clickEle.localName === 'span' || clickEle.localName === 'svg') {
        clickEle = clickEle.closest('div');
    }
    if (clickEle.nextSibling.style.display === 'block') {
        clickEle.nextSibling.style.display = 'none';
    } else {
        document.querySelectorAll('.filterSection').forEach( ele => (<any>ele).style.display = 'none' );
        clickEle.nextSibling.style.display = 'block';
    }
}

}
