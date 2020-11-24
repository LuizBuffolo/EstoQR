import { Injectable } from '@angular/core';
import { Monitor } from './monitor.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MonitorService {

  private monitors = new BehaviorSubject<Monitor[]>(null);
  currentMonitors = this.monitors.asObservable();

  changeMonitors(monitors: Monitor[]) {
    this.monitors.next(monitors);
  }

  private readonly rootURL: string = "https://localhost:44316/api/monitor";
  list: Monitor[];
  constructor(private http: HttpClient) { }
  

  postMonitor(formData: Monitor) {
    return this.http.post(this.rootURL, formData);
  }

  refreshList() {
    return this.http.get(this.rootURL);
  }

  deleteMonitor(id) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  getById(id) {
    return this.http.get(this.rootURL + '/' + id);
  }
}
