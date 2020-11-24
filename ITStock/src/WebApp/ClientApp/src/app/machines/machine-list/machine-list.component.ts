import { Component, OnInit} from '@angular/core';
import { MachineService } from '../machine-shared/machine.service';
import { Machine } from '../machine-shared/machine.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-machine-list',
    templateUrl: './machine-list.component.html',
    styles: []
})

export class MachinelistComponent implements OnInit {
  machines: Machine[];

  tableHeader: string[] = new Array(
    "Hostname",
    "Modelo",
    "Fabricante",
    "Usuário",
    "Setor"
  );

  constructor(private service: MachineService, private route: Router) {
  }

  ngOnInit() {
    this.refreshMachines();
    this.service.currentMachines.subscribe(machines => this.machines = machines);
  }

  refreshMachines() {
    this.service.refreshList().subscribe(
      (data) => {
        this.service.changeMachines(data as Machine[]);
        console.log(this.machines);
      },
      err => {
        if (err.status == 404) {
          this.service.changeMachines(null);
        }
      });
  }

  onDelete(id) {
    this.service.deleteMachine(id).subscribe(res => {
      this.refreshMachines();
    });
  }

  onInfo(id) {
    this.route.navigate(['/machine/' + id])
  }
}
