import { Component, OnInit } from '@angular/core';
import { Request } from '../request-shared/request.model';
import { RequestService } from '../request-shared/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Machine } from '../machines/machine-shared/machine.model';
import { MachineService } from '../machines/machine-shared/machine.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  requestId: String;
  userId: String;
  machines: Machine[];
  id: any;

  request: Request = {
    Id: '',
    User: '',
    Model: '',
    Status: ''
  }

  machine: Machine = {
    Id: '',
    Model: '',
    Manufacturer: '',
    Processor: '',
    Ram: '',
    User: '',
    Available: true
  }

  tableHeader: string[] = new Array(
    "Modelo",
    "Fabricante",
    "Usuário",
    "Processor",
    "Ram"
  );

  constructor(private service: RequestService, private route: ActivatedRoute, private serviceMachine: MachineService, private route2: Router) {
    this.route.params.subscribe(params => this.requestId = params['idrequest']);
    this.route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit() {
    if (this.requestId) {
      this.getById(this.requestId);
    }

    this.refreshMachines();
  }

  getById(requestId) {
    this.service.getById(requestId).subscribe(
      res => {
        this.request = res as Request;
      },
      err => { console.log(err) }
    );
  }

  getByIdMachine(machineId) {
    this.serviceMachine.getById(machineId).subscribe(
      res => {
        this.machine = res as Machine;
      },
      err => { console.log(err) }
    );
  }

  refreshMachines() {
    this.serviceMachine.refreshList().subscribe(
      res => {
        this.machines = res as Machine[];
        console.log(this.machines);
      },
      err => {
        if (err.status == 404) {
          console.log('404');
        }
      });
  }

  onAccept(id, model, manufacturer, processor, ram, user?: string, requestAtual?: Request, machineUpdate?: Machine) {

    this.getByIdMachine(id);
    this.machine.User = user;
    this.machine.Available = false;
    this.machine.Manufacturer = manufacturer;
    this.machine.Model = model;
    this.machine.Processor = processor;
    this.machine.Ram = ram;
    
    this.serviceMachine.postMachine(this.machine).subscribe(
      res => {
        this.serviceMachine.refreshList().subscribe(
          (data) => {
            this.serviceMachine.changeMachines(data as Machine[]);
          });
      },
      err => { console.log(err) }
    )

    requestAtual.Status = 'Aceito';
    this.service.postRequest(requestAtual).subscribe(
      res => {
        this.service.refreshList().subscribe(
          (data) => {
            this.service.changeRequests(data as Request[]);
          });
      },
      err => { console.log(err) }
    )

    // alert('Solicitação Aceita');
    this.onBack();
  }

  onReffuse(requestAtual, requestUpdate?: Request) {
    requestUpdate = requestAtual;
    requestUpdate.Status = 'Rejeitado';

    this.service.postRequest(requestUpdate).subscribe(
      res => {
        this.service.refreshList().subscribe(
          (data) => {
            this.service.changeRequests(data as Request[]);
          });
      },
      err => { console.log(err) }
    )

    // alert('Solicitação Recusada');
    this.onBack();
  }

  onBack() {
    this.route2.navigate(['/dashboard/' + this.userId]);
  }
}
