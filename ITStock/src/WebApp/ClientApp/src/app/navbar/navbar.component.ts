import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-shared/user.service';
import { User } from '../user-shared/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  userId: String;
  check: boolean = false;
  users: User[];

  ngOnInit(): void {
    this.service.currentUsers.subscribe(users => this.users = users);
    //this.check = this.checkUser();
    }

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.userId = params['id']);
  }

  /*checkUser(): boolean {
    this.refreshUsers();
    
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].Id == this.userId) {
        //this.route.navigate(['/dashboard/' + this.users[i].Id])
        if (this.users[i].Hierarchy == 'Administrador') {
          return true;
        }
      }
    }

    return false;
  }*/

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
