import { Injectable } from '@angular/core';
import { Peripheral } from './peripheral.model'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PeripheralService {

  private readonly rootURL: string = "https://localhost:44316/api/machine";
  list: Peripheral[];
  constructor(private http: HttpClient) { }
  

  postPeripheral(formData: Peripheral) {
    return this.http.post(this.rootURL, formData);
  }

  refreshList() {
    return this.http.get(this.rootURL);
  }

  deletePeripheral(id) {
    return this.http.delete(this.rootURL + '/' + id);
  }
}
