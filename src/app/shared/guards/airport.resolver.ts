import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { AirportService } from './../../services/airport.service';
import { IAirport } from 'src/app/models/IAirport';

@Injectable({
  providedIn: 'root',
})
export class AirportResolver implements Resolve<IAirport> {
  constructor(private airportService: AirportService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAirport> {
    const id = route.paramMap.get('id');

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
