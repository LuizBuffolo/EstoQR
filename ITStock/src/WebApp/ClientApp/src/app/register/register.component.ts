import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user-shared/user.model';
import { UserService } from '../user-shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  users: User[];
  check: boolean = false;

  user: User = {
    Id: '',
    Username: '',
    Password: '',
    Hierarchy: ''
  }

  constructor(
    private service: UserService
  ) { }

  registerUser() {
    console.log('mene');
  }

  ngOnInit() {
    this.resetForm();
    this.service.currentUsers.subscribe(users => this.users = users);
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
  
  /*FieldsChange(values: any): boolean {
    if (values.currentTarget.checked == true) {
      this.check = true;
      this.monitor.User = 'Estoque TI';
      this.monitor.Sector = 'TI';
      console.log(this.check);
      return true;
    }
    else {
      this.check = false;
      this.monitor.User = '';
      this.monitor.Sector = '';
      console.log(this.check);
      return false;
    }
  }*/
}
