import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tender-list-item',
  templateUrl: './tender-list-item.component.html',
  styleUrls: ['./tender-list-item.component.css']
})
export class TenderListItemComponent implements OnInit {

  @Input() tender: any;
  @Output() edit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {    
    
  }

  emitEditEvent(): void {
    this.edit.emit(this.tender);
  }

}
