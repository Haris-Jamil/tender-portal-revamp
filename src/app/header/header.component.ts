import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { TenderService } from '../tender.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUserCircle = faUserCircle
  showBtn = true;
  username: string;
  isAdmin: boolean = false;
  isStrayUser: boolean = false;

  constructor(private tenderService: TenderService, private router: Router) { }

  ngOnInit(): void {
    this.tenderService.authEvent.subscribe( (auth: any) => {
      if (!auth) {
        this.showBtn = true;        
      } else {
        this.showBtn = false;
        this.username = auth.username;
        this.isAdmin = auth.type == 0 ? true : false;
        this.isStrayUser = auth.type == 1 ? true : false;
      }
    });
    let user = localStorage.getItem('user-hal-tender');
    if (user) {
      user = JSON.parse(user);
      this.tenderService.authEvent.next(user);
    } 
  }

  showPopup(): void {
      this.tenderService.showPopup.next(true);
  }

  goto(route): void {
    this.router.navigate([`/${route}`]);
  }

  async logout(): Promise<void> {
    this.tenderService.showPaymentPopup.next(false);
    this.tenderService.showPopup.next(false);
    await this.tenderService.logout()
    this.router.navigate(['/login']);
  }

  showPaymentPopup(): void {
    this.tenderService.showPaymentPopup.next(true);
  }

}
