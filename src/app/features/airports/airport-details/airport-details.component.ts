import { Component } from '@angular/core';
import { IAirport, IAirportsResponse } from './../../../models/IAirport';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.scss'],
})
export class AirportDetailsComponent {
  airport$!: Observable<IAirport>;
  destroy$ = new Subject();
  airport!: IAirport;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getDataFromRoute();
  }

  getDataFromRoute() {
    this.airport$ = this.route.data.pipe(
      map(({ airports }) => {
        console.log(airports);
        this.airport = airports.data;
        return this.airport;
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    //angular should unsubscribe automatically from activatedroute observables, but just in case
    this.destroy$.next('destroyed');
    this.destroy$.complete();
  }
}
