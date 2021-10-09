import { Component, OnInit } from '@angular/core';
import { TenderService } from '../tender.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMsg: string;

  constructor(private tenderService: TenderService, private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/home']);
    }
  }

  async login(): Promise<void> {
    if (!this.username || !this.password) {
      this.errorMsg = '*Please provide both username and password';
    } else {
      this.errorMsg = '';
      const response: any = await this.tenderService.login(this.username, this.password);
      if (response == 0) {
        this.errorMsg = 'wrong username or password'
      } else {
        this.tenderService.setUser(response[0]);
        this.router.navigate(['/home'])
      }
    }
  }

}
