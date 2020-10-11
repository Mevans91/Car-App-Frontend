import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../_models/vehicle';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

 vehicle: Vehicle = {
   id: 1,
   make: 'Hyundai',
   model: 'Sonata',
   year: 2013,
   mileage: 100000,
   serviceScheduled: 'none',
   condition: 'used'
 }
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

}
