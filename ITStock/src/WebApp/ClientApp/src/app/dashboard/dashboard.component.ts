import { Component, OnInit } from '@angular/core';
import { User } from '../user-shared/user.model';
import { Request } from '../request-shared/request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-shared/user.service';
import { Machine } from '../machines/machine-shared/machine.model';
import { MachineService } from '../machines/machine-shared/machine.service';
import { NgForm } from '@angular/forms';
import { RequestService } from '../request-shared/request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId: String;
  qrBase: String;
  qrCode: String;
  logged: boolean;
  machines: Machine[];
  requests: Request[];
  users: User[];

  user: User = {
    Id: '',
    Username: '',
    Password: '',
    Hierarchy: ''
  }

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

  tableHeader4: string[] = new Array(
    "Modelo",
    "Fabricante",
    "Usuário",
    "Processor",
    "Ram",
    "Devolver"
  );

  tableHeader2: string[] = new Array(
    "Id",
    "Modelo",
    "Status"
  );

  tableHeader3: string[] = new Array(
    "Id",
    "Modelo",
    "User",
    "Status"
  );

  constructor(
    private route: ActivatedRoute,
    private route2: Router,
    private service: UserService,
    private serviceRequest: RequestService,
    private serviceMachine: MachineService,
    private nav: Router)
  {
    this.route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getById(this.userId);
    }
    this.qrBase = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
    this.qrCode = this.qrBase.concat(this.userId.toString());
    this.qrCode = this.qrCode.concat(".svg");
    // console.log(this.qrCode);

    this.refreshMachines();
    this.refreshRequests();
    this.service.currentUsers.subscribe(users => this.users = users);
    // this.checkLogged();
  
    // console.log("2" + this.requests);
  }

  getById(userId) {
    this.service.getById(userId).subscribe(
      res => {
        this.user = res as User;
        // console.log(this.user);
      },
      err => { console.log(err) }
    );
  }

  refreshRequests() {
    this.serviceRequest.refreshList().subscribe(
      res => {
        this.requests = res as Request[];
        // console.log("1" + this.requests);
      },
      err => {
        if (err.status == 404) {
          console.log('404');
        }
      });
  }

  refreshMachines() {
    this.serviceMachine.refreshList().subscribe(
      res => {
        this.machines = res as Machine[];
        // console.log(this.machines);
      },
      err => {
        if (err.status == 404) {
          console.log('404');
        }
      });
  }
  /*
  checkLogged() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].Id == this.userId) {
        if (this.users[i].LoggedIn == true) {
          this.logged = true;
        }
      }
    }
  }*/

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
  }

  onSubmit(form?: NgForm, username?: string) {
    this.request.User = username;
    this.request.Status = "Em Análise";
    alert("Pedido Realizado");

    var f = form
    this.serviceRequest.postRequest(this.request).subscribe(
      res => {
        this.refreshRequests();
        this.resetForm(f);
        this.service.refreshList().subscribe(
          (data) => {
            this.serviceRequest.changeRequests(data as Request[]);
          });
      },
      err => { console.log(err) }
    )
  }

  registerUser() {
    this.route2.navigate([this.userId + '/register/']);
  }

  registerMachine() {
    this.route2.navigate([this.userId + '/register-machine/']);
  }

  onInfo(requestId) {
    this.route2.navigate(['/dashboard/' + this.userId + '/request/' + requestId]);
  }

  searchQr() {
    this.route2.navigate(['/dashboard/' + this.userId + '/search/']);
  }

  onDelete(id) {
    this.serviceMachine.deleteMachine(id).subscribe(res => {
      this.refreshMachines();
    });
  }

  onReturn(machineReturn?: Machine) {
    
    machineReturn.User = 'Estoque';
    console.log(machineReturn);
    this.serviceMachine.postMachine(machineReturn).subscribe(
      res => {
        this.serviceMachine.refreshList().subscribe(
          (data) => {
            this.serviceMachine.changeMachines(data as Machine[]);
          });
        this.refreshMachines();
      },
      err => { console.log(err) }
    )
  }

  onQr(id) {
    this.route2.navigate(['/dashboard/' + this.userId + '/qr/' + id]);
  }
}
