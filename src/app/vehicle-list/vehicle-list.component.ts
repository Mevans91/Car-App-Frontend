import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VehicleService } from '../_services/vehicle.service';
import { VehicleListService } from '../_services/vehicle-list.service';
import { Vehicle } from '../_models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = []


  constructor(
    private vehicleService: VehicleService,
    private vehicleListService: VehicleListService
  ) { }

  ngOnInit(): void {
    this.retrieveAllVehicles()
  }

  retrieveAllVehicles() {
    this.vehicleListService.getAllVehicles().subscribe(vehicles => {
      if (vehicles) {
        this.vehicles = vehicles
      }
    }, error => {
      if (error) {
        console.log(error)
      }
    })
  }



}
