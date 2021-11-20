import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

interface filter {
  title: string,
  tenderNo: string,
  location: string,
  nature: string,
  companies: string,
  closingDate: string,
  publishedDate: string,
  categories: string
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  faCaretDown = faCaretDown;
  companies: string = '';
  @Output() emitFilter: EventEmitter<any> = new EventEmitter();

  filterObj: filter = {
    title: '',
    tenderNo: '',
    location: '',
    nature: '',
    companies: '',
    closingDate: '',
    publishedDate: '',
    categories: ''
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

  setCheckbox(event, filter) {
    const val = event.target.value;
    if (this.filterObj[filter].includes(val)) {
      this.filterObj[filter] = this.filterObj[filter].replace(`${val},`, '');
    } else {
      this.filterObj[filter] += `${val},`;
    }
  }

  changeDate(event, filter) {
      let date = event.target.value;
      if(date) {
          const parts = date.split('-');          
          date = [ parts[2], parts[1], parts[0] ].join('-');
      }
      this.filterObj[filter] = date;
  }

}
