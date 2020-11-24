import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from '../machine-shared/machine.service';
import { Machine } from '../machine-shared/machine.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-machine-edit',
    templateUrl: './machine-edit.component.html',
    styles: []
})
export class MachineEditComponent implements OnInit {
    
  machineId: String;
  check: boolean = false;
  machine: Machine = {
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

  constructor(private route: ActivatedRoute, private service: MachineService, private nav: Router) {
    this.route.params.subscribe(params => this.machineId = params['id']);
  }

  ngOnInit() :void {
    if (this.machineId){
      this.getById(this.machineId);
    }
  }
  
  getById(machineId) {
    this.service.getById(machineId).subscribe(
      res => {
        this.machine = res as Machine;
        console.log(this.machine);
      },
      err => { console.log(err) }
    );
  }

  onSubmit(form?: NgForm) {
    this.service.postMachine(this.machine).subscribe(
      res => {
        this.service.refreshList().subscribe(
          (data) => {
            this.service.changeMachines(data as Machine[]);
          });
        this.nav.navigate(['/machines']);
      },
      err => { console.log(err) }
    )
  }

  FieldsChange(values: any): boolean {
    if (values.currentTarget.checked == true) {
      this.check = true;
      this.machine.User = 'Estoque TI';
      this.machine.Sector = 'TI';
      console.log(this.check);
      return true;
    }
    else {
      this.check = false;
      this.machine.User = '';
      this.machine.Sector = '';
      console.log(this.check);
      return false;
    }

  }

 }
