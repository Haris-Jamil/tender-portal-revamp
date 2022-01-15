import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Tender } from '../models/Tender';
import { COMPANIES, CATEGORIES } from '../models/models';
import { TenderService } from '../tender.service';

@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.css']
})
export class AddTenderComponent implements OnInit, OnChanges {

  @Input() editTender: Tender;
  @Output() saved: EventEmitter<boolean> = new EventEmitter<boolean>();
  tender: Tender = new Tender();
  companies: string[] = COMPANIES;
  code: string = '';
  methods: string[] = [];
  checks = [false, false, false, false, false, false, false];
  mode: string;
  file1: File = null;
  file2: File = null;
  loading = false;
  btnText = 'save tender'
  btnState = 'btn-primary'

  categories: string[] = CATEGORIES; 


  constructor(private tenderService: TenderService) { }


  ngOnChanges(changes: SimpleChanges): void {   
    if (changes.editTender && changes.editTender.currentValue) {
      this.tender = {...changes.editTender.currentValue};
      this.tender.category = this.tender.category.replace('Consultancy Services', 'Consultancy');
      this.mode = 'edit';
    } else {
      this.tender = new Tender();
      this.mode = 'add';
    }
  }

  ngOnInit(): void {
  }

  categoryChange(categories: string[]): void {
    this.tender.category = categories.join(', ');
  }

  handleFileInput(files: FileList, number){
    this['file'+ number] = files.item(0);
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

  async save(): Promise<void> {    
    if (this.loading) {
      return;
    }
    this.loading = true;
    const formData = new FormData();  
    this.tender.method = this.methods.join(' or ');

    for(let key in this.tender)
      formData.append(key, this.tender[key]);

    if(this.file1)
      formData.append('file1', this.file1, this.file1.name);

    if(this.file2)
      formData.append('file2', this.file2, this.file2.name);
    const btn = document.querySelector('.saveBtn');

    if (this.mode === 'add') {
      const response = await this.tenderService.saveTender(formData);
      if (response === 1) {
        this.checks = [false, false, false, false, false, false];
        this.tender = new Tender();
        this.file1 = null;
        this.file2 = null;
        this.btnText = 'saved';
        this.btnState = 'btn-success disabled'
        this.saved.emit(true);
      } else {
        this.btnText = 'some error occured';
        this.btnState = 'btn-error disabled'; 
      }
    } else {
      const response = await this.tenderService.editTender(formData);
      if (response === 1) {
        this.btnText = 'saved';
        this.btnState = 'btn-success disabled';
        this.saved.emit(true);
      } else {
        this.btnText = 'some error occured'
        this.btnState = 'btn-error disabled'; 
      }
    }
    setTimeout(() => {
      this.btnState = 'btn-primary'; 
      this.btnText = 'save tender'
    }, 2000);
    this.loading = false;
  }

  toggleDisplay(eleSelector) {
    const ele = document.querySelector(eleSelector);
    if (ele) {
      ele.style.display = ele.style.display === '' ? 'none' : '';
    }
    
  }

  truncateString(text): string {
    if (text.length > 20) {
      text = text.substring(0, 19) + "...";
    }
    return text;
  }
  
}
