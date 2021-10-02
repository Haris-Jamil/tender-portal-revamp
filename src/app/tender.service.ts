import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  baseUrl = 'http://tii-usa.com/tender-tracker-new/api/';

  constructor(private http: HttpClient) { }

  getVendors(page: number): Promise<any> {
      return this.http.get(`${this.baseUrl}getVendors.php?page=${page}`).toPromise();
  }

}
