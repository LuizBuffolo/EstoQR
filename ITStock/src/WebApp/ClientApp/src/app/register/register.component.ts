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

  registerUser() {
    console.log('mene');
  }

  ngOnInit() {
    this.resetForm();
    this.service.currentUsers.subscribe(users => this.users = users);
    this.checkAdm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
  }

  onSubmit(form?: NgForm) {
    var f = form
    this.service.postUser(this.user).subscribe(
      res => {
        this.resetForm(f);
        this.service.refreshList().subscribe(
          (data) => {
            this.service.changeUsers(data as User[]);
          });
      },
      err => { console.log(err) }
    )
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
}
