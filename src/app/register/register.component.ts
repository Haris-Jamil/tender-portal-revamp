import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TenderService } from '../tender.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  orgName: string;
  city: string;
  email: string;

  errorMsg: string;

  constructor(private tenderService: TenderService, private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.height = '';
    document.querySelector('body').style.height = '';
    (document.querySelector('div.footer') as any).style.position = 'absolute';
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/home']);
    }
  }

  async register(): Promise<void> {
    if (!this.username || !this.password || !this.contactNumber || !this.orgName || !this.city || !this.email) {
      this.errorMsg = '*Please provide all fields';
    } else if (this.password !== this.confirmPassword) {
      this.errorMsg = '*Please make sure passwords are same';
    } else if (this.username.length < 5 || this.username.length > 20) {
      this.errorMsg = '*username should be 5 to 20 characters long';
    } else if (this.password.length < 5 || this.password.length > 20) {
      this.errorMsg = '*password should be 5 to 20 characters long';
    } else {
      this.errorMsg = '';
      const response: any = await this.tenderService.register({
        username: this.username,
        password: this.password,
        contact: this.contactNumber,
        org: this.orgName,
        city: this.city,
        email: this.email
      });
      if (response && response.length == 0) {       
        this.router.navigate(['/login'])        
      } else {
        this.errorMsg = 'some error occured'
      }
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == 'Enter') {
      this.register();
    }
  }

}
