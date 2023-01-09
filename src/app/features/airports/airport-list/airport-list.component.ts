import { Component, ElementRef, ViewChild } from '@angular/core';
import { IAirport } from 'src/app/models/IAirport';
import { AirportService } from '../../../services/airport.service';
import { Observable, fromEvent, of, catchError } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  finalize,
  map,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AirportDetailsComponent } from './../airport-details/airport-details.component';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.scss'],
})
export class AirportListComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('airportDetailsComponent')
  airportDetailsComponent!: AirportDetailsComponent;

  airports$!: Observable<IAirport[]>;
  //isLoading = false;
  noResults = false;
  noInput = true;

  constructor(private airportService: AirportService, private router: Router) {}

  ngAfterViewInit() {
    this.input?.nativeElement?.focus();
    this.onInput();
  }

  onInput() {
    if (this.input) {
      this.airports$ = fromEvent(this.input.nativeElement, 'input').pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.noInput = false;
          this.noResults = false;
        }),
        map((ev) => (ev.target as HTMLInputElement).value),
        switchMap((value) => {
          if (!value) {
            return of([]);
          }

          //this.isLoading = true;
          return this.airportService.getAirports(value);
          //.pipe(finalize(() => (this.isLoading = false)));
        }),
        tap((airports) => {
          if (!airports.length && !this.input?.nativeElement?.value) {
            this.noInput = true;
          } else if (!airports.length) {
            this.noResults = true;
          }
        }),
        catchError((err, obs) => {
          console.error(err);
          return obs;
        })
      );
    }
  }

  onAirportDetailsHandler(airport: IAirport) {
    this.router.navigate(['airports', airport.id]);
  }

  getAirportNameExpression() {
    return `${this.airportDetailsComponent?.airport?.name}(${this.airportDetailsComponent?.airport?.address?.countryCode})`;
  }
}
