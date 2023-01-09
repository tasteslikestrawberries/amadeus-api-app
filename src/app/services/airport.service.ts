import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, take } from 'rxjs';
import { IAirport, IAirportsResponse } from '../models/IAirport';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private airports = new BehaviorSubject<IAirport[]>([]);
  airports$ = this.airports.asObservable();

  private baseUrl = 'https://test.api.amadeus.com/v1';

  constructor(private http: HttpClient) {}

  getAirports(keyword: string): Observable<IAirport[]> {
    return this.http
      .get<IAirportsResponse>(
        `${this.baseUrl}/reference-data/locations?subType=CITY&keyword=${keyword}`
      )
      .pipe(map(({ data }) => data.slice(0, 5)));
  }

  getAirport(id: string | null): Observable<IAirport> {
    return this.http.get<IAirport>(
      `${this.baseUrl}/reference-data/locations/${id}`
    );
  }
}
