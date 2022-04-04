import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  page:number = 1;
  @Output() emitPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  previousBatch(): void {
    if (this.page > 1) {
      this.page -= 5;
      this.selectPage(null, this.page, document.querySelector('.paginationItem:nth-child(2)'));
    }    
  }

  reset(): void {
    this.page = 1;
    this.selectPage(null, this.page, document.querySelector('.paginationItem:nth-child(2)'));
  }

  nextBatch(): void {
    this.page += 5;
    this.selectPage(null, this.page, document.querySelector('.paginationItem:nth-child(2)'));
  }

  selectPage(e, page: number, ele?): void {
    document.querySelector('.paginationContainer .selected').classList.remove('selected');
    if (!e && ele) {
      ele.classList.add('selected');
    } else {
      e.target.classList.add('selected');
    }    
    this.emitPage.next(page);
  }

}
