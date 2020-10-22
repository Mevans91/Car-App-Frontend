import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vehicle } from '../_models/vehicle';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'
import { User } from '../_models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../_services/user.service';
import { VehicleService } from '../_services/vehicle.service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  year: number
 vehicle: Vehicle
 vehicleImg: string
 currentUser: User
 private subs = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private userService: UserService,
    private vehicleService: VehicleService
  ) {
    this.currentUser = this.userService.currentUserValue
   }

  ngOnInit(): void {
    this.route.params.subscribe(vehicle => {
      if (vehicle && vehicle.id) {
        this.retrieveVehiclebyId(vehicle.id)
      }
    })
  }

  retrieveVehiclebyId(id: number) {
    const params = { id: id }
    console.log(params)
    this.subs.add(
      this.vehicleService.getVehicleById(params).subscribe(data => {
        console.log(data)
        if (data) {
          // this.vehicle = new Vehicle(data.vehicle[0]);
          console.log(this.vehicle[0].year);
        }
      }, error => {
        if (error) {
          console.log(error)
        }
      })
    )
  }

  setDefaultPic() {
    this.vehicleImg = 'assets/images/cardefaultpic.png'
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
