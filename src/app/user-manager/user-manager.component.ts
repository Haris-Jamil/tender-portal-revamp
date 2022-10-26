import { Component, OnInit } from '@angular/core';
import { TenderService } from '../tender.service';
import { faExclamationCircle, faPlus, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'

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
  faPen = faPen;

  startDate: any;
  endDate: any;
  amount: number;

  subReqPage = 1;

  userSubscribedCategories: string[] = [];

  views = [true, false, false];
  username: string;
  password: string;
  contactNumber: string;
  orgName: string;
  city: string;
  email: string;
  selectedUserId: string;
  editMode = false;

  editModeCompany = false;
  companies: any[] = [];
  filteredCompanies: any[] = [];
  company: string;
  status: string;
  selectedCompanyId: string;

  constructor(private tenderService: TenderService) { }

  ngOnInit(): void {
      this.fetchUsers();
      this.loadSubsRequests();
      this.fetchCompanies();
  }

  deleteSubscription(sub) {
    if (confirm('Are you sure about deleting this subscription?')) {
      this.tenderService.deleteSubscription(sub.id).then( (resp) => {
        if (resp === 1) {
          this.loadSubscriptions(this.selectedUser.id);
        } else {
          alert('some error occured while deleting')
        }
      });
    }
  }

 async AddEditUser() {
    if (this.editMode) {
      const response = await this.tenderService.editUser({
        id: this.selectedUserId,
        username: this.username,
        password: this.password,
        contact: this.contactNumber,
        org: this.orgName,
        city: this.city,
        email: this.email
      });
      if (response === 1) {        
        this.resetAddForm();
        this.fetchUsers();
      } else {
        this.resetAddForm();
        alert('some error occured while editing user');
      }
    } else {
      const response: any = await this.tenderService.register({
        username: this.username,
        password: this.password,
        contact: this.contactNumber,
        org: this.orgName,
        city: this.city,
        email: this.email
      });
      if (response && response.length == 0) {   
        this.fetchUsers();    
      } else {
        alert('some error occured while adding user');
      }
    }
    
  }

  async AddEditCompany() {
    if (this.editModeCompany) {
      const response = await this.tenderService.editCompany(this.company, this.status, this.selectedCompanyId);
      if (response === 1) {        
        this.resetAddFormCom();
        this.fetchCompanies();
      } else {
        this.resetAddFormCom();
        alert('some error occured while editing Company');
      }
    } else {
      const response: any = await this.tenderService.addCompany(this.company, this.status);
      if (response === 1) {   
        this.fetchCompanies(); 
        this.resetAddFormCom();   
      } else {
        this.resetAddFormCom();   
        alert('some error occured while adding company');
      }
    }
    
  }

  resetAddFormCom() {
    this.editModeCompany = false;
    this.selectedCompanyId = null;
    this.company = ''
    this.status = ''
  }

  resetAddForm() {    
    this.editMode = false;
    this.selectedUserId = null;
    this.username = ''
    this.password = ''
    this.contactNumber = ''
    this.orgName = ''
    this.city = ''
    this.email = ''
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

  filterCompany(evt): void {
    const val = evt.target.value;
      if (val.length > 2) {
        this.filteredCompanies = this.companies.filter( c => c.company.indexOf(val) > -1);
      } else {
        this.filteredCompanies = this.companies;
      }
  }

  async addSubscription(): Promise<any> {
    if (this.startDate && this.endDate && this.amount) {
      const categoriesStr = this.userSubscribedCategories.join('@');
      const response = await this.tenderService.addSubscription(this.startDate, this.endDate, this.amount, this.selectedUser.id, categoriesStr);
      if (response == 1) {
        this.startDate = undefined;
        this.endDate = undefined;
        this.amount = undefined;
        this.userSubscribedCategories = [];
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

  setCheckbox(event) {    
      const val = event.target.value;
      if (this.userSubscribedCategories.includes(val)) {
        const index = this.userSubscribedCategories.indexOf(val);
        if (index > -1) {
          this.userSubscribedCategories.splice(index, 1);
        }
      } else {
        this.userSubscribedCategories.push(val);
      }
  }

  showTab(index) {
    for (let i=0; i<this.views.length; i++) {
      this.views[i] = index === i;
    }    
  }

  deleteUser(id) {
    if (confirm("do you really want to delete this user?")) {
      this.tenderService.deleteUserById(id).then( (resp) => {
        if (resp === 1) {
          this.fetchUsers();
        } else {
          alert('some error occured while deleting user');
        }
      });
    }
  }

  editUser(user) {
    this.editMode = true;
    this.selectedUserId = user.id;
    this.username = user.username;
    this.password = user.password
    this.contactNumber = user.phone
    this.orgName = user.orgname
    this.email = user.email
    this.city = user.city
  }

  cancelEdit(form = 1) {
    if (form === 1) {
      this.editMode = false;
      this.username = '';
      this.password = '';
      this.contactNumber = '';
      this.orgName = '';
      this.email = '';
      this.city = '';
    } else if (form === 2) {
      this.editModeCompany = false;
      this.company = '';
      this.status = '';
    }
    
  }

  async fetchCompanies() {
    this.users = await this.tenderService.getUsers();   
    this.filteredUsers = this.users; 

    this.companies = await this.tenderService.getCompanies();
    this.filteredCompanies = this.companies;
  }

  deleteCompany(id) {
    if (confirm("do you really want to delete this record?")) {
      this.tenderService.deleteCompany(id).then( (resp) => {
        if (resp === 1) {
          this.fetchCompanies();
        } else {
          alert('some error occured while deleting company');
        }
      });
    }
  }

  editCompany(company) {
    this.editModeCompany = true;
    this.selectedCompanyId = company.id;
    this.company = company.company;
    this.status = company.status;
  }

}
