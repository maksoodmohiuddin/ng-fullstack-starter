import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { City, WeatherAPIPacket } from 'src/app/interfaces/weather';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public weatherService: WeatherService) { }

  cities: Array<City>;
  weatherPackets: Array<WeatherAPIPacket>;
  selectedName: string = '';
  selectedCity: City;

  ngOnInit(): void {
    this.selectedCity = {
      id: null,
      name: '',
      country: 'GB',
      coord: null
    };
    this.cities = [];
    this.getCities();
    this.weatherPackets = [];
    this.cities.forEach(city => {
      this.weatherService.getCurrentWeatherForCity(city.id).subscribe((data: WeatherAPIPacket) => {
        if (data) {
          this.weatherPackets.push(data);
        }
      })
    });
  }

  getCities() {
    this.cities = this.weatherService.getCities();
  }

  addCity(id: number) {
    this.cities = this.weatherService.addCity(this.selectedCity);
    this.weatherService.getCurrentWeatherForCity(this.selectedCity.id).subscribe((data: WeatherAPIPacket) => {
      if (data) {
        this.weatherPackets.push(data);
        this.selectedName = '';
        this.selectedCity = {
          id: null,
          name: '',
          country: 'GB',
          coord: null
        };
      }
    })
  }

  updateCities() {
    this.selectedName === '' ? [] : this.cities = this.weatherService.getCitiesByName(this.selectedName);
  }

  deleteCity(id: number) {
    for (let i = 0, len = this.weatherPackets.length; i < len; i++){
      if (this.weatherPackets[i].id === id){
        this.weatherPackets.splice(i, 1);
        break;
      }
    }
    this.cities = this.weatherService.deleteCity(id);
  }
}

