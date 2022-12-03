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
  @Input() page: number;
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

      const currentDate7Days = new Date(new Date().setDate(new Date().getDate() - 7 ));
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      
      // if (closingDate < currentDate7Days) {
      //   this.status = "closed";
      // }
      // if (closingDate > currentDate7Days && closingDate < currentDate) {
      //   this.status = "closed (under 7 days)";
      // } else {
      //   this.status = "open"
      // }

      if (closingDate < currentDate) {
        this.status = "closed";
      } else {
        this.status = "open"
      }
    }    

    this.tenderService.authEvent.subscribe( (user) => {
      if (user) {
        // this.blurMode = ((user.type == 1) || (user.type == 2 && this.page !== 1)) ? true : false; // only active blur mode for non trial/subscribed user
        this.isAdmin = user.type == 0 ? true : false;
      }
    });
  }

  emitEditEvent(): void {
    this.edit.emit(this.tender);
  }

  gotoDetail() {
    this.router.navigate([`/detail/${this.tender.id}`]);
    //window.open(`/detail/${this.tender.id}`, "_blank");
  }

  emitdeleteEvent(): void {
    if (confirm('do you want to delete this article?')) {
      this.delete.emit(this.tender.id);
    }
  }

  async sendInvite(event): Promise<any> {
    const url = window.location.host + `/detail/${this.tender.id}`;
    await this.tenderService.sendInvitationEmail( encodeURIComponent(url), this.tender.closingDate)
    event.target.innerText = 'sent';
    setTimeout( () => {
      event.target.innerText = 'Invite';
    }, 2000);
  }

}
