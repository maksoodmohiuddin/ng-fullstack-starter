import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { City, WeatherAPIPacket } from '../interfaces/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {

  city: City;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public weatherService: WeatherService) { }

    weatherPackets: Array<WeatherAPIPacket>;

  ngOnInit(): void {
    
    this.weatherPackets = [];
    this.route.params.subscribe( params => {
      this.getForcastById(params['id']);
    });
    
  }

  getForcastById(id: number) {
    this.weatherService.getForcastForCity(id)
      .subscribe((data :WeatherAPIPacket) => {
        if (data) {         
          this.weatherPackets.push(data);
        }
      })
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

}
