import { Injectable } from '@angular/core';
import { Vehicle } from '../_models/vehicle';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehicleUrl: string;

  constructor(private http: HttpClient) {
    this.vehicleUrl = `${environment.apiUrl}api/v1/vehicles`
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.vehicleUrl}/index`)
  }


  getVehicleById(params): Observable<Vehicle> {
    return this.http.get<any>(`${this.vehicleUrl}/show?id=${params.id}`)
  }







//   /* GET vehicles whose name contains search term */
//  searchVehicle(term: string): Observable<Vehicle[]> {
//   if (!term.trim()) {
//     // if not search term, return empty vehicle array.
//     return of([]);
//   }
//   return this.http.get<Vehicle[]>(`${this.vehicleUrl}/?name=${term}`).pipe(
//     catchError(this.handleError<Vehicle[]>('searchVehicles', []))
//   );
//   }
}
