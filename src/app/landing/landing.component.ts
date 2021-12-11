import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelector('html').style.height = '100%';
    document.querySelector('body').style.height = '100%';    
    (document.querySelector('div.footer') as any).style.position = 'inherit';
  }

}
