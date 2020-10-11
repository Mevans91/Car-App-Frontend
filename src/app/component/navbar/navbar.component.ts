import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AdminService } from 'src/app/_services/admin.service';
import { Admin } from 'src/app/_models/administrator'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  currentUser: User
  currentAdmin: Admin
  private subs = new Subscription


  constructor(
    private userService: UserService,
    private adminService: AdminService,
    public router: Router

  ) { }



  ngOnInit(): void {
    // this.subscribeToCurrentUser()
  }

  subscribeToCurrentUser() {
     this.subs.add( //creates a new subscription
      this.userService.currentUser.subscribe(user => { //creates the subscription to our currentUser
        if (user) { //checks to see if the logged in user exists
          this.currentUser = user //sets our currentUser value in our component
        } else { //if the current user doesnt exist
          this.currentUser = null //we set the current user as null
        }
      })
    )
  }

  subscribeToCurrentAdmin() {
    this.subs.add( //creates a new subscription
     this.adminService.currentAdmin.subscribe(admin => { //creates the subscription to our currentUser
       if (admin) { //checks to see if the logged in user exists
         this.currentAdmin = admin //sets our currentUser value in our component
       } else { //if the current user doesnt exist
         this.currentAdmin = null //we set the current user as null
       }
     })
   )
 }

  logoutUser() {
    this.userService.logoutUser()
  }

  logoutAdmin() {
    this.adminService.logoutAdmin()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
