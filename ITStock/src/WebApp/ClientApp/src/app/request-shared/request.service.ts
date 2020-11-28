import { Injectable } from '@angular/core';
import { Request } from './request.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requests = new BehaviorSubject<Request[]>(null);
  currentRequests = this.requests.asObservable();

  changeRequests(requests: Request[]) {
    this.requests.next(requests);
  }

  private readonly rootURL: string = "https://localhost:44316/api/request";

  constructor(private http: HttpClient) { }


  postRequest(formData: Request) {
    return this.http.post(this.rootURL, formData);
  }

  refreshList() {
    return this.http.get(this.rootURL);
  }

  deleteRequest(id) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  getById(id) {
    return this.http.get(this.rootURL + '/' + id);
  }
}
