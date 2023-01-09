import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, of, tap, map } from 'rxjs';
import { AirportService } from './../../services/airport.service';
import { IAirport } from 'src/app/models/IAirport';
import { IAirportFormData } from './../../models/IAirport';

@Injectable({
  providedIn: 'root',
})
export class AirportResolver implements Resolve<IAirport | IAirportFormData> {
  constructor(private airportService: AirportService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IAirport | IAirportFormData> {
    const id = route.paramMap.get('id');
    const airportDataFromStorage = JSON.parse(
      localStorage.getItem('airport') as string
    ) as IAirportFormData;

    if (airportDataFromStorage?.id === id) {
      return of({ ...airportDataFromStorage, isFromLocalStorage: true });
    } else {
      return this.airportService.getAirport(id).pipe(
        tap((data) => {
          if (!data) {
            this.router.navigate(['airports']);
          }
        }),
        catchError((err, obs) => {
          console.error(err);
          this.router.navigate(['airports']);
          return obs;
        })
      );
    }
  }
}
