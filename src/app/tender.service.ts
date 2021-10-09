import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  baseUrl = 'http://tii-usa.com/tender-tracker-new/api/';
  @Output() authEvent: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  setUser(userData): void {
    this.authEvent.next(userData);    
    localStorage.setItem('user', JSON.stringify({username: userData.username, type: userData.type}));
  }

  getTenders(page: number, filter): Promise<any> {
    let queryStr = '';
    for (let k in filter) {
      queryStr += `&${k}=${filter[k]}`
    }
    return this.http.get(`${this.baseUrl}getTenders.php?page=${page}${queryStr}`).toPromise();
  }

  saveTender(data): Promise<any> {
    return this.http.post(`${this.baseUrl}addTender.php`, data).toPromise();
  }

  editTender(data): Promise<any> {
    return this.http.post(`${this.baseUrl}editTender.php`, data).toPromise();
  }

  getTenderById(id): Promise<any> {
    return this.http.get(`${this.baseUrl}getTender.php?id=${id}`).toPromise();
  }

  deleteTenderById(id): Promise<any> {
    return this.http.get(`${this.baseUrl}deleteTender.php?id=${id}`).toPromise();
  }

  login(username, password): Promise<any> {
    return this.http.get(`${this.baseUrl}login2.php?username=${username}&password=${password}`).toPromise();
  }

  register(username, password): Promise<any> {
    return this.http.get(`${this.baseUrl}register.php?username=${username}&password=${password}`).toPromise();
  }

  logout(): void {
    this.authEvent.next(null);
    localStorage.removeItem('user');
  }

}
