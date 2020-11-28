import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-shared/user.service';
import { User } from '../user-shared/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[];
  check: boolean = false;

  user: User = {
    Id: '',
    Username: '',
    Password: '',
    Hierarchy: '',
  }

  constructor(
    private service: UserService,
    private route: Router
  ) { }

  ngOnInit() {
    this.refreshUsers();
    this.service.currentUsers.subscribe(users => this.users = users);
  }

  loginUser() {
    console.log('mene');
  }

  onSubmit(userLogged?: User) {
    let flag;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].Username == this.user.Username) {
        if (this.users[i].Password == this.user.Password) {
          //console.log(this.users[i].Id);
          flag = true;
          userLogged = this.users[i];
          // userLogged.LoggedIn = true;
          this.service.postUser(userLogged).subscribe(
            res => {
              this.service.refreshList().subscribe(
                (data) => {
                  this.service.changeUsers(data as User[]);
                });
            },
            err => { console.log(err) }
          )
          this.route.navigate(['/dashboard/' + this.users[i].Id])
        }
      }
    }
    if (!flag) {
      alert("Usuário ou senha incorreta");
      this.user.Username = "";
      this.user.Password = "";
    }
  }

  refreshUsers() {
    this.service.refreshList().subscribe(
      (data) => {
        this.service.changeUsers(data as User[]);
        console.log(this.users);
      },
      err => {
        if (err.status == 404) {
          this.service.changeUsers(null);
        }
      });
  }
}
