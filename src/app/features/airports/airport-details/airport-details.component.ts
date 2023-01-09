import { Component } from '@angular/core';
import { IAirport } from './../../../models/IAirport';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.scss'],
})
export class AirportDetailsComponent {
  airport$!: Observable<IAirport>;
  destroy$ = new Subject();
  airport!: IAirport;

  form = this.fb.group({
    id: [''],
    iataCode: ['', [Validators.required]],
    name: ['', [Validators.required]],
    detailedName: ['', [Validators.required]],
    type: ['', [Validators.required]],
    subType: ['', [Validators.required]],
    regionCode: ['', [Validators.required]],
    stateCode: [''],
    countryCode: ['', [Validators.required]],
    countryName: ['', [Validators.required]],
    cityCode: ['', [Validators.required]],
    cityName: ['', [Validators.required]],
    latitude: [0, [Validators.required]],
    longitude: [0, [Validators.required]],
    timeZoneOffset: ['', [Validators.required]],
    score: [0, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getDataFromRoute();
  }

  getDataFromRoute() {
    this.airport$ = this.route.data.pipe(
      map(({ airports }) => {
        this.airport = airports.data;
  
        this.populateForm(this.airport);
        return this.airport;
      }),
      takeUntil(this.destroy$)
    );
  }

  populateForm(airport: IAirport) {
    const airportDataFromStorage = localStorage.getItem('airport');

    if (JSON.parse(airportDataFromStorage as string)?.id === airport.id) {
      this.form.patchValue(JSON.parse(airportDataFromStorage as string));
    } else {
      this.form.patchValue({
        id: airport.id,
        iataCode: airport.iataCode,
        name: airport.name,
        detailedName: airport.detailedName,
        type: airport.type.toUpperCase(),
        subType: airport.subType,
        regionCode: airport.address?.regionCode,
        stateCode: airport.address?.stateCode,
        countryCode: airport.address?.countryCode,
        countryName: airport.address?.countryName,
        cityCode: airport.address?.cityCode,
        cityName: airport.address?.cityName,
        latitude: airport.geoCode?.latitude,
        longitude: airport.geoCode?.longitude,
        timeZoneOffset: airport.timeZoneOffset,
        score: airport.analytics.travelers.score,
      });
    }
  }

  onSubmit() {
    localStorage.setItem('airport', JSON.stringify(this.form.value));
  }

  ngOnDestroy() {
    //angular should unsubscribe automatically from activatedroute observables, but just in case
    this.destroy$.next('destroyed');
    this.destroy$.complete();
  }
}
