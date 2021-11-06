import { Component, OnInit } from '@angular/core';
import { TenderService } from '../tender.service';
import { faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  users: any[];
  filteredUsers: any[];
  selectedUser: any;
  faExclamationCircle = faExclamationCircle;
  faPlus = faPlus;

  startDate: any;
  endDate: any;
  amount: number;

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
      this.fetchUsers();
  }

  async fetchUsers(): Promise<any> {
    this.users = await this.tenderService.getUsers();   
    this.filteredUsers = this.users; 
  }

  filterUser(evt): void {
      const val = evt.target.value;
      if (val.length > 2) {
        this.filteredUsers = this.users.filter( user => user.username.indexOf(val) > -1);
      } else {
        this.filteredUsers = this.users;
      }
  }

  async addSubscription(): Promise<any> {
    if (this.startDate && this.endDate && this.amount) {
      const response = await this.tenderService.addSubscription(this.startDate, this.endDate, this.amount, this.selectedUser.id);
      if (response == 1) {
        this.startDate = undefined;
        this.endDate = undefined;
        this.amount = undefined;
      }
    }
    
  }

  loadSubscriptions(userId): void {
      this.selectedUser = this.users.filter( u => u.id == userId )[0];
  }

}
