import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Tender } from '../models/Tender';
import { COMPANIES } from '../models/models';

@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.css']
})
export class AddTenderComponent implements OnInit, OnChanges {

  @Input() editTender: Tender;
  tender: Tender = new Tender();
  companies: string[] = COMPANIES;
  code: string = '';
  methods: string[] = [];
  checks = [false, false, false, false, false, false, false];

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {   
    if (changes.editTender && changes.editTender.currentValue) {
      this.tender = changes.editTender.currentValue;
    } else {
      this.tender = new Tender();
    }
  }

  ngOnInit(): void {
  }

  companyChange(event) {
    this.code = event.target.value;
  }

  checkBoxChange(evn) {
    const val: string = evn.target.value;
    if (evn.target.checked) {
      this.methods.push(val);
    } else {
      let ind: number = this.methods.indexOf(val);
      if (ind > -1) {
        this.methods.splice(ind, 1);
      }
    }
  }

  toggleDisplay(eleSelector) {
    const ele = document.querySelector(eleSelector);
    if (ele) {
      ele.style.display = ele.style.display === '' ? 'none' : '';
    }
    
  }

  selectForEdit() {
    
  }

}
