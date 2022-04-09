import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { CATEGORIES } from '../models/models';
import { TenderService } from '../tender.service';

interface Filter {
  title: string,
  tenderNo: string,
  location: string,
  nature: string,
  companies: string,
  closingDate: string,
  closingDateEnd: string,
  publishedDate: string,
  publishedDateEnd: string,
  categories: string,
  uploadDate: string,
  nilBid: boolean
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  faCaretDown = faCaretDown;
  companies: string = '';
  categories: string[] = CATEGORIES;
  companyText: string = '';
  counts = [];
  @Output() emitFilter: EventEmitter<any> = new EventEmitter();

  filterObj: Filter = {
    title: '',
    tenderNo: '',
    location: '',
    nature: '',
    companies: '',
    closingDate: '',
    closingDateEnd: '',
    publishedDate: '',
    publishedDateEnd: '',
    categories: '',
    uploadDate: '',
    nilBid: false
  }

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
    this.setCounts();
  }

  async setCounts(): Promise<void>{
    this.counts = await this.tenderService.getTenderCounts();
  }

  getCount(title): string {
    if (!this.counts.length) { return '0'; }
    const company: {count, code} = this.counts.filter( x => x.code == title )[0];
    return `(${company ? company.count : '0'})`
  }

  applyFilter(): void {
    const appliedFilters = {};
    for( let key in this.filterObj ) {
      if (this.filterObj[key]) {
        appliedFilters[key] = this.filterObj[key];
      }
    }
    if (this.companyText) {
      appliedFilters['companies'] = appliedFilters['companies'] ? appliedFilters['companies'] : ''
      appliedFilters['companies'] += `${this.companyText},`
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
    if (filter === 'nilBid') {
      this.filterObj.nilBid = event.target.checked;
    } else {
      const val = event.target.value;
      if (this.filterObj[filter].includes(val)) {
        this.filterObj[filter] = this.filterObj[filter].replace(`${val},`, '');
      } else {
        this.filterObj[filter] += `${val},`;
      }
    }    
  }

  changeDate(event, filter) {
      let date = event.target.value;
      if(date) {
          const parts = date.split('-');          
          date = [ parts[2], parts[1], parts[0] ].join('-');
      }
      this.filterObj[filter] = date;
      if (!date) {
        (document.querySelector(`input[name=${filter + 'End'}]`)as any).value = '';
        this.filterObj[filter + 'End'] = date;
      }
  }

}
