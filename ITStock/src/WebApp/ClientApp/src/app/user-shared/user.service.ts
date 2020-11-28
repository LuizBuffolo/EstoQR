import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserService {

  private users = new BehaviorSubject<User[]>(null);
  currentUsers = this.users.asObservable();

  changeUsers(users: User[]) {
    this.users.next(users);
  }

  private readonly rootURL: string = "https://localhost:44316/api/user";
  private readonly rootURL2: string = "https://localhost:44316/api/machine";
  list: User[];
  constructor(private http: HttpClient) { }
  

  postUser(formData: User) {
    return this.http.post(this.rootURL, formData);
  }

  refreshList() {
    return this.http.get(this.rootURL);
  }

  deleteUser(id) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  getById(id) {
    return this.http.get(this.rootURL + '/' + id);
  }

  getMachines() {
    return this.http.get(this.rootURL2);
  }
}
