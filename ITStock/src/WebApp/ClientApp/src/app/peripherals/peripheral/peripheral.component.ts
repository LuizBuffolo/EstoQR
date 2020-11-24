import { Component, OnInit } from '@angular/core';
import { PeripheralService } from '../peripheral-shared/peripheral.service';
import { NgForm } from '@angular/forms';
import { Peripheral } from '../peripheral-shared/peripheral.model';

@Component({
  selector: 'app-peripheral',
  templateUrl: './peripheral.component.html',
  styles: []
})

export class PeripheralComponent implements OnInit {

  machine: Peripheral = {
    Id: '',
    Hostname: '',
    Model: '',
    Manufacturer: '',
    Processor: '',
    CFit: '',
    Ram: '',
    Sector: '',
    User: '',
    Workday: '',
    Avaiable: true
  }

  constructor(private service: PeripheralService) { }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form!=null)
      form.resetForm();
  }

  onSubmit() {
    this.service.postPeripheral(this.machine).subscribe(
      res => { console.log('FUNCIONA') },
      err => { console.log(err)}
    )
  }
}
