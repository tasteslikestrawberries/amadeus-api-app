import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, of } from 'rxjs';
import { IAirport, IAirportsResponse } from '../models/IAirport';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private baseUrl = 'https://test.api.amadeus.com/v1';

  private topAirports: IAirport[] = [];
  private subject = new BehaviorSubject<IAirport[]>([]);
  topAirports$ = this.subject.asObservable();

  constructor(private http: HttpClient) {
    const storedTopAirports = localStorage.getItem('topAirports');
    if (storedTopAirports) {
      this.topAirports = JSON.parse(storedTopAirports);
      this.subject.next(this.topAirports);
    }
  }

  getAirports(keyword: string): Observable<IAirport[]> {
    return this.http
      .get<IAirportsResponse>(
        `${this.baseUrl}/reference-data/locations?subType=CITY&keyword=${keyword}`
      )
      .pipe(
        map(({ data }) => data.slice(0, 5)),
        tap((data) => this.updateTopAirports(data))
      );
  }

  getAirport(id: string | null): Observable<IAirport> {
    return this.http
      .get<{ data: IAirport }>(`${this.baseUrl}/reference-data/locations/${id}`)
      .pipe(map(({ data }) => data));
  }

  updateTopAirports(results: IAirport[]) {
    results.forEach((result) => {
      const foundAirport = this.topAirports.find(
        (airport) => airport.id === result.id
      );

      if (foundAirport) {
        foundAirport.searchCount++;
      } else {
        this.topAirports.push({ ...result, searchCount: 1 });
      }
    });

    //sort by desc, copy first 10
    this.topAirports = this.topAirports
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 10);

    //save to storage and emit
    localStorage.setItem('topAirports', JSON.stringify(this.topAirports));
    this.subject.next(this.topAirports);
  }

  isAirportInTopList(airportId: string): Observable<boolean> {
    return this.topAirports$.pipe(
      map((topAirports) => !!topAirports.find(({ id }) => id === airportId))
    );
  }
}
