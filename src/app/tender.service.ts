import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  baseUrl = 'https://tii-usa.com/tender-tracker-new/api/';

  // candidates for moving into a seperate communication service
  authEvent: BehaviorSubject<any> = new BehaviorSubject(null);
  showPopup: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showPaymentPopup: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  setUser(userData): void {
    this.authEvent.next(userData[0]);    
    localStorage.setItem('user', JSON.stringify({
      username: userData[0].username.trim(), 
      type: userData[0].type, 
      userId: userData[0].id,
      trialTaken: userData[0].trialTaken
    }));
    localStorage.setItem('sessionId', userData[1]);
  }

  getTenders(page: number, filter, catFilter): Promise<any> {
    let queryStr = '';
    if (!filter['categories'] && catFilter) {
      filter['categories'] = '';
    }
    for (let k in filter) {
      if (k === 'categories') {
        if (!filter[k])
          filter[k] = '';
          filter[k] += catFilter;
      }
      queryStr += `&${k}=${filter[k]}`
    }
    return this.get(`${this.baseUrl}getTenders.php?page=${page}${queryStr}`);
  }

  getUserCategories(): Promise<any> {
    const userId = this.getCurrentUser().userId;
    return this.get(`${this.baseUrl}getUserCategories.php?userId=${userId}`);
  }

  sendInvitationEmail(link, duedate): Promise<any> {
    return this.get(`${this.baseUrl}sendEmail.php?link=${link}&dueDate=${duedate}`);
  }

  saveTender(data): Promise<any> {
    return this.post(`${this.baseUrl}addTender.php`, data);
  }

  editTender(data): Promise<any> {
    return this.post(`${this.baseUrl}editTender.php`, data);
  }

  getTenderById(id): Promise<any> {
    return this.get(`${this.baseUrl}getTender.php?id=${id}`);
  }

  deleteTenderById(id): Promise<any> {
    return this.get(`${this.baseUrl}deleteTender.php?id=${id}`);
  }

  login(username, password): Promise<any> {
    return this.get(`${this.baseUrl}login2.php?username=${username}&password=${password}`);
  }

  register(data): Promise<any> {
    return this.get(`${this.baseUrl}register.php?username=${data.username}
    &password=${data.password}&contact=${data.contact}&org=${data.org}&city=${data.city}&email=${data.email}`);
  }

  logout(): Promise<any> {    
    return this.get(`${this.baseUrl}logout.php?dummy=1`).then( (resp) => {
        if (resp == 1) {          
            localStorage.removeItem('user');
            localStorage.removeItem('sessionId');
            this.authEvent.next(null);
        } else {
            alert('some error occured while loging out');
        }
        
    });
  }

  getCurrentUser(): any {
      let user = localStorage.getItem('user');
      if (user) {
          return JSON.parse(user);
      }
  }

  activateTrial(): Promise<any> {
    const userId = this.getCurrentUser().userId;
    return this.get(`${this.baseUrl}activateTrial.php?userId=${userId}`);
  }

  getUsers(): Promise<any> {
    return this.get(`${this.baseUrl}getUsers2.php?dummy=1`);
  }

  addSubscription(startDate, endDate, amount, userId, categories): Promise<any> {
    return this.get(`${this.baseUrl}addSubscription.php?startDate=${startDate}&endDate=${endDate}&amount=${amount}&userId=${userId}&categories=${categories}`);
  }

  getSubscriptions(userId): Promise<any> {
    return this.get(`${this.baseUrl}getSubscriptions.php?userId=${userId}`);
  }

  sendSubRequest(): Promise<any> {
    const userId = this.getCurrentUser().userId;
    return this.get(`${this.baseUrl}sendSubRequest.php?userId=${userId}`);
  }

  getSubRequests(page: number): Promise<any> {
    return this.get(`${this.baseUrl}getSubRequests.php?page=${page}`);
  }

  updateStatus(id, status): Promise<any> {
    return this.get(`${this.baseUrl}updateStatus.php?id=${id}&status=${status}`);
  }

  getTenderCounts(): Promise<any> {
    return this.get(`${this.baseUrl}getTenderCounts.php?dummy=1`)
  }

  editUser(data): Promise<any> {
    return this.get(`${this.baseUrl}editUser.php?id=${data.id}&username=${data.username}
    &password=${data.password}&contact=${data.contact}&org=${data.org}&city=${data.city}&email=${data.email}`);
  }

  deleteUserById(id): Promise<any> {
    return this.get(`${this.baseUrl}deleteUser2.php?id=${id}`);
  }

  editCompany(company, status, id): Promise<any> {
    return this.get(`${this.baseUrl}editCompany.php?company=${company}&status=${status}&id=${id}`);
  }

  deleteCompany(id): Promise<any> {
    return this.get(`${this.baseUrl}deleteCompany.php?id=${id}`);
  }

  deleteSubscription(id): Promise<any> {
    return this.get(`${this.baseUrl}deleteSub.php?id=${id}`);
  }

  addCompany(company, status): Promise<any> {
    return this.get(`${this.baseUrl}addCompany.php?company=${company}&status=${status}`);
  }

  getCompanies(): Promise<any> {
    return this.get(`${this.baseUrl}getCompanies.php?dummy=1`);
  }

  get(url): Promise<any> {
      url += `&sid=${localStorage.getItem('sessionId')}`;
      return this.http.get(url).toPromise();
  }

  post(url, data): Promise<any> {
    data.append('sid', localStorage.getItem('sessionId'));
    return this.http.post(url, data).toPromise();
  } 

}
