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
  machines: Machine[];
  id: any;
  request: Request = {
    Id: '',
    User: '',
    Model: '',
    Status: ''
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

  onAccept(id, user?: string, requestAtual?: Request, machineUpdate?: Machine) {
    for (let i = 0; i < this.machines.length; i++) {
      if (this.machines[i].Id == id) {
        this.machines[i].User = user;
        this.machines[i].Available = false;
        console.log(user);
        machineUpdate = this.machines[i];
      }
    }
    
    this.serviceMachine.postMachine(machineUpdate).subscribe(
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

    this.route2.navigate([]);
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
  }
}
