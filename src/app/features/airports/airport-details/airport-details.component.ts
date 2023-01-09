import { Component } from '@angular/core';
import { IAirport, IAirportFormData } from './../../../models/IAirport';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.scss'],
})
export class AirportDetailsComponent {
  destroy$ = new Subject();
  airport!: IAirportFormData;

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
    this.route.data
      .pipe(
        map(({ airport }) => {
          if (airport.isFromLocalStorage) {
            this.airport = airport as IAirportFormData;
            this.form.patchValue(this.airport);
          } else {
            this.populateForm(airport as IAirport);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  populateForm(airport: IAirport) {
    this.airport = {
      id: airport.id,
      isFromLocalStorage: false,
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
    };
    
    this.form.patchValue(this.airport);
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
