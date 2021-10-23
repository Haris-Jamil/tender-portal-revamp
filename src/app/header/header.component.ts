import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private tenderService: TenderService, private router: Router) { }

  ngOnInit(): void {
    this.tenderService.authEvent.subscribe( (auth: any) => {
      if (!auth) {
        this.showBtn = true;        
      } else {
        this.showBtn = false;
        this.username = auth.username;
      }
    });
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.tenderService.authEvent.next(user);
    } 
  }

  goto(route): void {
    this.router.navigate([`/${route}`]);
  }

  async logout(): Promise<void> {
    await this.tenderService.logout()
    this.router.navigate(['/login']);
  }

}
