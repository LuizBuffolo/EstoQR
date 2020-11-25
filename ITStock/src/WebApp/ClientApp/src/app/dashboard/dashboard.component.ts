import { Component, OnInit } from '@angular/core';
import { User } from '../user-shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-shared/user.service';
import { Machine } from '../machines/machine-shared/machine.model';
import { MachineService } from '../machines/machine-shared/machine.service';

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

  tableHeader: string[] = new Array(
    "Hostname",
    "Modelo",
    "Fabricante",
    "Usuário",
    "Setor"
  );

  constructor(private route: ActivatedRoute, private service: UserService, private serviceMachine: MachineService, private nav: Router) {
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
    this.service.refreshList().subscribe(
      (data) => {
        this.serviceMachine.changeMachines(data as Machine[]);
        console.log(this.machines);
      },
      err => {
        if (err.status == 404) {
          this.serviceMachine.changeMachines(null);
        }
      });
  }

}
