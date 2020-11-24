import { Injectable } from '@angular/core';
import { Machine } from './machine.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MachineService {

  private machines = new BehaviorSubject<Machine[]>(null);
  currentMachines = this.machines.asObservable();

  changeMachines(machines: Machine[]) {
    this.machines.next(machines);
  }

  private readonly rootURL: string = "https://localhost:44316/api/machine";
 
  constructor(private http: HttpClient) { }
  

  postMachine(formData: Machine) {
    return this.http.post(this.rootURL, formData);
  }

  refreshList() {
    return this.http.get(this.rootURL);
  }

  deleteMachine(id) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  getById(id) {
    return this.http.get(this.rootURL + '/' + id);
  }

}
