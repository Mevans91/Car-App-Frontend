import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: User
  private subs = new Subscription
  constructor(
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeToCurrentUser()
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

}
