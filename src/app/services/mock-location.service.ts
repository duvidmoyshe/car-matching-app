import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cities, countries } from '../const/colors.const';

@Injectable({
  providedIn: 'root'
})

export class MockLocationService {
  constructor() { }

  getCountries(): Observable<{ id: number, value: string }[]> {
    return of(countries);
  }

  getCitiesInCountry(countryId: number): Observable<any> {
    const _cities = cities[countryId - 1] || [];
    return of(_cities);
  }
}
