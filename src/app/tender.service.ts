import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  baseUrl = 'https://tii-usa.com/tender-tracker-new/api/';
  @Output() authEvent: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  setUser(userData): void {
    this.authEvent.next(userData[0]);    
    localStorage.setItem('user', JSON.stringify({username: userData[0].username, type: userData[0].type}));
    localStorage.setItem('sessionId', userData[1]);
  }

  getTenders(page: number, filter): Promise<any> {
    let queryStr = '';
    for (let k in filter) {
      queryStr += `&${k}=${filter[k]}`
    }
    return this.get(`${this.baseUrl}getTenders.php?page=${page}${queryStr}`);
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

  register(username, password): Promise<any> {
    return this.get(`${this.baseUrl}register.php?username=${username}&password=${password}`);
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

  get(url): Promise<any> {
      url += `&sid=${localStorage.getItem('sessionId')}`;
      return this.http.get(url).toPromise();
  }

  post(url, data): Promise<any> {
    data['sid'] = localStorage.getItem('sessionId');
    return this.http.post(url, data).toPromise();
  }

  

}
