import { Injectable } from '@angular/core';
import { Vehicle } from './_models/vehicle';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehicleUrl)
    .pipe(
      catchError(this.handleError<Vehicle[]>('getVehicles', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getVehicleNo404<Data>(id: number): Observable<Vehicle> {
    const url = `${this.vehicleUrl}/?id=${id}`;
    return this.http.get<Vehicle[]>(url)
      .pipe(
        map(vehicles => vehicles[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Vehicle>(`getVehicle id=${id}`))
      );
  }

  getVehicle(id: number): Observable<Vehicle> {
    /** GET heroes from the server */
    const url = `${this.vehicleUrl}/${id}`;
    return this.http.get<Vehicle>(url).pipe(
      catchError(this.handleError<Vehicle>(`getVehicle id=${id}`))
    );

  }

  private vehicleUrl = 'api/vehicles'; //URL to web api

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }

  /** PUT: update the vehicle on the server */
  updateVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.put(this.vehicleUrl, vehicle, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateVehicle'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new vehicle to the server */
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehicleUrl, vehicle, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle>('addVehicle'))
    );
  }

  /** DELETE: delete the vehicle from the server */
  deleteVehicle(vehicle: Vehicle | number): Observable<Vehicle> {
    const id = typeof vehicle === 'number' ? vehicle : vehicle.id;
    const url = `${this.vehicleUrl}/${id}`;

    return this.http.delete<Vehicle>(url, this.httpOptions).pipe(
      catchError(this.handleError<Vehicle>('deleteVehicle'))
    );
  }

  /* GET vehicles whose name contains search term */
searchVehicle(term: string): Observable<Vehicle[]> {
  if (!term.trim()) {
    // if not search term, return empty vehicle array.
    return of([]);
  }
  return this.http.get<Vehicle[]>(`${this.vehicleUrl}/?name=${term}`).pipe(
    catchError(this.handleError<Vehicle[]>('searchVehicles', []))
  );
}
}
