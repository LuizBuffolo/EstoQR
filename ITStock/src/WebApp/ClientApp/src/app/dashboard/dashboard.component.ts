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
  machines: Machine[];

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

  constructor(private route: ActivatedRoute, private service: UserService, private serviceRequest: RequestService, private serviceMachine: MachineService, private nav: Router) {
    this.route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getById(this.userId);
    }
    this.qrBase = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
    this.qrCode = this.qrBase.concat(this.userId.toString());
    this.qrCode = this.qrCode.concat(".svg");
    console.log(this.qrCode);
    this.refreshMachines();
    console.log(this.machines);
  }

  getById(userId) {
    this.service.getById(userId).subscribe(
      res => {
        this.user = res as User;
        console.log(this.user);
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

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
  }

  onSubmit(form?: NgForm, username?: string) {
    this.request.User = username;
    this.request.Status = "Em Análise";

    var f = form
    this.serviceRequest.postRequest(this.request).subscribe(
      res => {
        this.resetForm(f);
        this.service.refreshList().subscribe(
          (data) => {
            this.serviceRequest.changeRequests(data as Request[]);
          });
      },
      err => { console.log(err) }
    )
  }
}
