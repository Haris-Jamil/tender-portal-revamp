import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TenderService } from '../tender.service';

declare const svgMap;

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

    this.initMap();
        
  }

  initMap() {
    new svgMap({
      initialPan: {
        x: 780,
        y: 180
      },
      targetElementID: 'svgMap',
      initialZoom: 4,
      showContinentSelector: true,
      noDataText: 'Not Available',
      data: {
        data: {
          count: {
            name: '',
            format: '',          
          },
        },
        applyData: 'count',
        values: {
          PK: { count: '' },
          BD: { count: '' }
        }
      }
    });

    setTimeout( () => {
      document.querySelector('#svgMap-map-country-PK').addEventListener('click' , (e) => {
        console.log('Pakistan Selected');
      });

      document.querySelector('#svgMap-map-country-BD').addEventListener('click' , (e) => {
        window.open("https://www.tii-usa.com/portals/hal-tender-ban", "_blank");
      })
    }, 600)
  }

}
