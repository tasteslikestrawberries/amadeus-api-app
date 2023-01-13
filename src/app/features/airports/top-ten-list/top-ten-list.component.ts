import { Component, Input, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAirport } from 'src/app/models/IAirport';
import { AirportService } from 'src/app/services/airport.service';

@Component({
  selector: 'app-top-ten-list',
  templateUrl: './top-ten-list.component.html',
  styleUrls: ['./top-ten-list.component.scss'],
})
export class TopTenListComponent {
  topAirports$!: Observable<IAirport[]>;

  constructor(private airportService: AirportService) {}

  ngOnInit() {
    this.topAirports$ = this.airportService.topAirports$;
  }
}
