import { Component, OnInit } from '@angular/core';
import { MachineService } from '../machines/machine-shared/machine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Machine } from '../machines/machine-shared/machine.model';

@Component({
  selector: 'app-view-qr',
  templateUrl: './view-qr.component.html',
  styleUrls: ['./view-qr.component.css']
})
export class ViewQrComponent implements OnInit {
  machineId: String;
  userId: String;
  qrBase: String;
  qrCode: String;

  machine: Machine = {
    Id: '',
    Model: '',
    Manufacturer: '',
    Processor: '',
    Ram: '',
    User: '',
    Available: true
  }

  constructor(private route: ActivatedRoute, private serviceMachine: MachineService, private route2: Router) {
    this.route.params.subscribe(params => this.machineId = params['idmachine']);
    this.route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit() {
    if (this.machineId) {
      this.getById(this.machineId);
    }

    this.qrBase = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
    this.qrCode = this.qrBase.concat(this.machineId.toString());
    this.qrCode = this.qrCode.concat(".svg");
  }

  getById(machineId) {
    this.serviceMachine.getById(machineId).subscribe(
      res => {
        this.machine = res as Machine;
        // console.log(this.user);
      },
      err => { console.log(err) }
    );
  }

  onBack() {
    this.route2.navigate(['/dashboard/' + this.userId]);
  }
}
