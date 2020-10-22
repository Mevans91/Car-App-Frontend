import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  private currentUser: User
  constructor() { }

  ngOnInit(): void {
  }

  updateSchedule() {

  }

}
