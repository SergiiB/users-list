import { Injectable } from '@angular/core';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

    countries: Country[] = [
        { name: 'USA', flag: 'us.svg' },
        { name: 'Germany', flag: 'de.svg' },
        { name: 'Italy', flag: 'it.svg' },
        { name: 'France', flag: 'fr.svg' },
        { name: 'Scotland', flag: 'gb-sct.svg' },
        { name: 'Spain', flag: 'es.svg' },
        { name: 'Hungary', flag: 'hu.svg' },
        { name: 'Australia', flag: 'au.svg' },
        { name: 'Brazil', flag: 'br.svg' },
        { name: 'Canada', flag: 'ca.svg' }
    ];

    constructor() {}

}
