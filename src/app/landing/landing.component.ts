import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TenderService } from '../tender.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  openTenderCount: number;

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
    document.querySelector('html').style.height = '100%';
    document.querySelector('body').style.height = '100%';    
    (document.querySelector('div.footer') as any).style.position = 'inherit';
    this.tenderService.getTenderCounts().then( (resp) => {
      this.openTenderCount = resp[2].openBids;
    });
  }

}
