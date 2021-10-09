import { Component, OnInit } from '@angular/core';
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
  errorMsg: string;

  constructor(private tenderService: TenderService, private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/home']);
    }
  }

  async register(): Promise<void> {
    if (!this.username || !this.password) {
      this.errorMsg = '*Please provide both username and password';
    } else if (this.password !== this.confirmPassword) {
      this.errorMsg = '*Please make sure passwords are same';
    } else if (this.username.length < 5 || this.username.length > 20) {
      this.errorMsg = '*username should be 5 to 20 characters long';
    } else if (this.password.length < 5 || this.password.length > 20) {
      this.errorMsg = '*password should be 5 to 20 characters long';
    } else {
      this.errorMsg = '';
      const response: any = await this.tenderService.register(this.username, this.password);
      if (response && response.length == 0) {
        this.tenderService.setUser({
          username: this.username,
          type: 2
        });
        this.router.navigate(['/home'])        
      } else {
        this.errorMsg = 'some error occured'
      }
    }
  }

}
