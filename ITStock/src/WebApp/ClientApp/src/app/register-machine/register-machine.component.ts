import { Component, OnInit } from '@angular/core';
import { MachineService } from '../machines/machine-shared/machine.service';
import { Machine } from '../machines/machine-shared/machine.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-machine',
  templateUrl: './register-machine.component.html',
  styleUrls: ['./register-machine.component.css']
})
export class RegisterMachineComponent implements OnInit {
  machines: Machine[];
  userId: String;

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
    private route: ActivatedRoute,
    private route2: Router,
    private service: MachineService
  ) {
    this.route.params.subscribe(params => this.userId = params['id'])
  }

  ngOnInit() {
    this.service.currentMachines.subscribe(machines => this.machines = machines);
  }

  onSubmit() {
    if (this.machine.Manufacturer != "" && this.machine.Model != "" && this.machine.Processor != "" && this.machine.Ram != "") {
      this.service.postMachine(this.machine).subscribe(
        res => {
          this.machine.Manufacturer = "";
          this.machine.Model = "";
          this.machine.Processor = "";
          this.machine.Ram = "";
          this.service.refreshList().subscribe(
            (data) => {
              this.service.changeMachines(data as Machine[]);
            });
          alert("Máquina cadastrada com sucesso")
        },
        err => { console.log(err) }
      )
    } else {
      alert("Nenhum campo pode ser nulo");
    }
  }

  onBack() {
    this.route2.navigate(['/dashboard/' + this.userId]);
  }

}
