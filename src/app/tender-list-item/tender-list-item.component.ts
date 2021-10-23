import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TenderService } from '../tender.service';

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
  blurMode: boolean = false
  isAdmin: boolean = false;

  constructor(private router: Router, private tenderService: TenderService) { }


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

    this.tenderService.authEvent.subscribe( (user) => {
      if (user) {
        this.blurMode = user.type == 1 ? true : false; // only active blur mode for non trial/subscribed user
        this.isAdmin = user.type == 0 ? true : false;
      }
    });
  }

  emitEditEvent(): void {
    this.edit.emit(this.tender);
  }

  gotoDetail() {
    window.open(`/detail/${this.tender.id}`, "_blank");
  }

  emitdeleteEvent(): void {
    if (confirm('do you want to delete this article?')) {
      this.delete.emit(this.tender.id);
    }
  }

}
