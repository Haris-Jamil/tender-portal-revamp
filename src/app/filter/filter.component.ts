import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { CATEGORIES, COMPANIES } from '../models/models';
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
export class FilterComponent implements OnInit, OnChanges{

  faCaretDown = faCaretDown;
  companies: string = '';
  categories: string[] = CATEGORIES;
  allCompanies: string[] = COMPANIES;
  companyText: string = '';
  counts = [];
  @Input() modifiedFilters: any;
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

  ngOnChanges(changes: SimpleChanges): void {

    const modifiedFilter = changes.modifiedFilters.currentValue;    
    if (!modifiedFilter) return;

    if (['nature', 'companies', 'categories', 'nilBid'].includes(modifiedFilter.filterName) ) {

      if (modifiedFilter.filterName === 'companies' && !this.allCompanies.includes(modifiedFilter.filter)) {
        this.companyText = '';
      } else {
        if (modifiedFilter.filterName === 'nilBid') {
          modifiedFilter.filter = modifiedFilter.filter.replaceAll(" ", "" );
        }
        document.getElementById(`${modifiedFilter.filter}`).click(); 
      }      

    } else if (['title', 'tenderNo', 'location'].includes(modifiedFilter.filterName)) {

      (document.getElementById(`${modifiedFilter.filterName}`) as HTMLInputElement).value  = '';
      this.filterObj[modifiedFilter.filterName] = '';

    } else if (['closingDate', 'closingDateEnd', 'publishedDate', 'publishedDateEnd', 'uploadDate'].includes(modifiedFilter.filterName)) {

      (document.getElementById(`${modifiedFilter.filterName}`) as HTMLInputElement).value  = '';
      this.filterObj[modifiedFilter.filterName] = null;

    }

    setTimeout( () => {
      this.applyFilter();
    }, 500)
  }

  async setCounts(): Promise<void>{
    this.counts = await this.tenderService.getTenderCounts();
  }

  getCount(title): string {
    if (!this.counts[0].length) { return '0'; }
    const company: {count, code} = this.counts[0].filter( x => x.code == title )[0];
    return `(${company ? company.count : '0'})`
  }

  getCatCount(title): string {
    if (this.counts && this.counts.length && !this.counts[1].length) { return '0'; }
    const data: {count, category} = this.counts[1].filter( x => x.category == title )[0];
    return `(${data.category ? data.count : '0'})`
  }  

  applyFilter(): void {
    const appliedFilters = {};
    if ( !(document.getElementById('NoBidSecurity') as HTMLInputElement).checked && 
           !(document.getElementById('WithBidSecurity') as HTMLInputElement).checked) {
            delete this.filterObj['nilBid'];
    }
    for( let key in this.filterObj ) {
      if (this.filterObj[key] || key === 'nilBid') {
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
    if (filter === 'NoBidSecurity' || filter === 'WithBidSecurity') {
      this.filterObj.nilBid = filter === 'NoBidSecurity';
      if ((document.getElementById(filter === 'NoBidSecurity' ? 'WithBidSecurity' : 'NoBidSecurity') as HTMLInputElement).checked) {
        (document.getElementById(filter === 'NoBidSecurity' ? 'WithBidSecurity' : 'NoBidSecurity') as HTMLInputElement).checked = false;
      }      
    } else {
      const val =  event.target.value;
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
