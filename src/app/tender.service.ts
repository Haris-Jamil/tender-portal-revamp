import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  baseUrl = 'http://tii-usa.com/tender-tracker-new/api/';

  constructor(private http: HttpClient) { }

  getTenders(page: number): Promise<any> {
    return this.http.get(`${this.baseUrl}getTenders.php?page=${page}`).toPromise();
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

}
