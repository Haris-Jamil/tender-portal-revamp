import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tender-list-item',
  templateUrl: './tender-list-item.component.html',
  styleUrls: ['./tender-list-item.component.css']
})
export class TenderListItemComponent implements OnInit {

  @Input() tender: any;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();
  status: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.tender.closingDate) {
      const dateParts = this.tender.closingDate.split('-');
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);
      const closingDate = new Date(year, month-1, day);

      const currentDate = new Date();

      if (closingDate < currentDate) {
        this.status = "closed";
      } else {
        this.status = "open"
      }
    }    
  }

  emitEditEvent(): void {
    this.edit.emit(this.tender);
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.tender.id]);
  }

  emitdeleteEvent(): void {
    if (confirm('do you want to delete this article?')) {
      this.delete.emit(this.tender.id);
    }
  }

}
