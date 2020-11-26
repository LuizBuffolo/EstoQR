import { Component, OnInit } from '@angular/core';
import { MachineService } from '../machines/machine-shared/machine.service';
import { Machine } from '../machines/machine-shared/machine.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-machine',
  templateUrl: './register-machine.component.html',
  styleUrls: ['./register-machine.component.css']
})
export class RegisterMachineComponent implements OnInit {
  machines: Machine[];

  machine: Machine = {
    Id: '',
    Model: '',
    Manufacturer: '',
    Processor: '',
    Ram: '',
    User: 'Estoque',
    Available: true
  }

  constructor(
    private service: MachineService
  ) { }

  ngOnInit() {
    this.resetForm();
    this.service.currentMachines.subscribe(machines => this.machines = machines);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
  }

  onSubmit(form?: NgForm) {
    var f = form
    this.service.postMachine(this.machine).subscribe(
      res => {
        this.resetForm(f);
        this.service.refreshList().subscribe(
          (data) => {
            this.service.changeMachines(data as Machine[]);
          });
      },
      err => { console.log(err) }
    )
  }

}
