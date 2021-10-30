import { Component, OnInit } from '@angular/core';
import { TenderService } from '../tender.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  users: any[];

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
      this.fetchUsers();
  }

  async fetchUsers(): Promise<any> {
    this.users = await this.tenderService.getUsers();
    console.log(this.users);
  }

}
