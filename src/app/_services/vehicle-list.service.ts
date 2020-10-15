import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../_models/vehicle';
import { VehicleService } from '../_services/vehicle.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleListService {
  private vehicleApi: string

  constructor(
    private http: HttpClient
  ) {
    this.vehicleApi = `${environment.apiUrl}api/v1/vehicles`
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.vehicleApi}/index`)
  }
}
