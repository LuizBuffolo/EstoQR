
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user-shared/user.model';
import { UserService } from '../user-shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userId: String;
  users: User[];
  check: boolean = false;

  user: User = {
    Id: '',
    Username: '',
    Password: '',
    Hierarchy: ''
  }

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private route2: Router
  ) {
    this.route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit() {
    this.service.currentUsers.subscribe(users => this.users = users);
    this.checkAdm();
  }

  onSubmit() {
    if (this.user.Username != "" && this.user.Password != "" && this.user.Hierarchy != "") {
      this.service.postUser(this.user).subscribe(
        res => {
          alert("Usuário Cadastrado");
          this.user.Hierarchy = "";
          this.user.Username = "";
          this.user.Password = "";
          this.service.refreshList().subscribe(
            (data) => {
              this.service.changeUsers(data as User[]);
            });
        },
        err => { console.log(err) }
      )
    }
    else {
      alert("Nenhum campo pode ser nulo");
    }
  }

  checkAdm() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].Id == this.userId) {
        if (this.users[i].Hierarchy != 'Administrador') {
          this.route2.navigate(['/home']);
        }
      }
    }
  }

  onBack() {
    this.route2.navigate(['/dashboard/' + this.userId]);
  }
}
