import { Component, OnInit} from '@angular/core';
import { MachineService } from '../machine-shared/machine.service';
import { NgForm } from '@angular/forms';
import { Machine } from '../machine-shared/machine.model';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styles: []
})

export class MachineComponent implements OnInit {
  machines: Machine[];
  check: boolean = false;

  machine: Machine = {
    Id: '',
    Model: '',
    Manufacturer: '',
    Processor: '',
    Ram: '',
    User: '',
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
    if(form!=null)
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

  FieldsChange(values: any) : boolean{
    if (values.currentTarget.checked == true) {
      this.check = true;
      this.machine.User = 'Estoque TI';
      console.log(this.check);
      return true;
    }
    else {
      this.check = false;
      this.machine.User = '';
      console.log(this.check);
      return false;
    }
    
  }

}
