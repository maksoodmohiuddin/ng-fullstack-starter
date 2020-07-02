import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { City, WeatherAPIPacket } from '../interfaces/weather';
import * as cityList from '../../assets/city_list_GB.json';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_KEY = "f9827188ca143dc182429634f715d8ba";
  API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  API_FORCAST_URL = "https://api.openweathermap.org/data/2.5/forecast?";
  selectedUnits: string = 'C';

  constructor(private http: HttpClient) { }

  cities: Array<City> = (cityList as any).default;
  savedCities: Array<City> = [
    { "id": 2633352, "name": "York", "state": "", "country": "GB", "coord": { "lon": -1.08271, "lat": 53.95763 } },
    { "id": 3333191, "name": "Sandwell", "state": "", "country": "GB", "coord": { "lon": -2, "lat": 52.5 } },
    { "id": 2653193, "name": "Chicheley", "state": "", "country": "GB", "coord": { "lon": -0.68647, "lat": 52.103031 } }
  ];

  deleteCity(id: number): Array<City>{
    for (let i = 0, len = this.savedCities.length; i < len; i++){
      if (this.savedCities[i].id === id){
        this.savedCities.splice(i, 1);
        break;
      }
    }
    return this.savedCities;
  }

  getCities(): Array<City> {
    return this.savedCities;
  }

  addCity(city: City) : Array<City> {
    if (city){
      this.savedCities.push(city);
    }
    return this.savedCities;
  }

  getCurrentWeatherForCity(id: number): Observable<WeatherAPIPacket> {
    return this.http.get<WeatherAPIPacket>(`${this.API_URL}id=${id}&appid=${this.API_KEY}`);
  }

  // Chnage this to api for 5 day frocast or something
  getForcastForCity(id: number): Observable<WeatherAPIPacket> {
    return this.http.get<WeatherAPIPacket>(`${this.API_FORCAST_URL}id=${id}&appid=${this.API_KEY}`);
  }

  getCitiesByName(name: string) {
    let returnCities: Array<City> = [];
    let count = 0;
    // loop to search and add, seems best way to do this to limit the returned items as Array.filter doesn't have limit option
    for (let i = 0, len = this.cities.length; i < len && count <= 10; i++) {
      if (this.cities[i].name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) > -1) {
        returnCities.push(this.cities[i]);
        count++;
      }
    }
    return returnCities;
  }
}
