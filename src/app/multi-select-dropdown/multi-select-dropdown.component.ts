import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent implements OnInit, OnChanges {

  @Input() options: any;
  @Input() selectedOptions: string[];

  @Output() selectionChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {    
    if (this.options.length > 0) {
      this.options = this.options.map( (opt) => { 
        const option = {'key': opt, 'value': opt, 'checked': false};
        if (this.selectedOptions.includes(option.key)) {
          option.checked = true;
        }
        return option;
       });
    }    
  }

  toggleDisplay(event) {
    const ele = event.target.nextSibling;
    if (ele) {
      ele.style.display = ele.style.display === '' ? 'none' : '';
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (!changes.selectedOptions.isFirstChange()) {
        this.options = this.options.map( (option) => { 
          if (this.selectedOptions.includes(option.key)) {
            option.checked = true;
          }
          return option;
         });
      }
  }

  isChecked(key): boolean {
    return this.selectedOptions.includes(key);
  }

  toggleCheckbox(option: any): void {
    option.checked = !option.checked;
    this.emitSelection();
  }

  emitSelection(): void {
    this.selectedOptions = this.options.map( (opt) => {
      if (opt.checked) {
        return opt.value;
      }
    }).filter( val => val );
    this.selectionChanged.emit( this.selectedOptions );
  }

}
