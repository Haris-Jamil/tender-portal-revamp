import { Component, OnInit } from '@angular/core';
import { TenderService } from '../tender.service';
import { faExclamationCircle, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  users: any[];
  filteredUsers: any[];
  subs: any[] = [];
  subRequests: any[] = [];
  selectedUser: any;
  faExclamationCircle = faExclamationCircle;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  startDate: any;
  endDate: any;
  amount: number;

  subReqPage = 1;

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
      this.fetchUsers();
      this.loadSubsRequests();
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
        this.loadSubscriptions(this.selectedUser.id);
      }
    }
    
  }

  async loadSubscriptions(userId): Promise<void> {
      this.selectedUser = this.users.filter( u => u.id == userId )[0];
      this.subs = await this.tenderService.getSubscriptions(this.selectedUser.id);
  }

  async loadSubsRequests(): Promise<void> {
    const response = await this.tenderService.getSubRequests(this.subReqPage);
    this.subRequests = this.subRequests.concat(response);
    this.subReqPage++;
  }

  async updateStatus(index, id, status): Promise<void> {
    const newStatus = status == 1 ? 0 : 1;
    const response = await this.tenderService.updateStatus(id, newStatus);
    if (response == 1) {
      this.subRequests[index].status = newStatus;
    }
  }

}
