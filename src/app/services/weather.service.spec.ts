import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { City } from '../interfaces/weather';

describe('WeatherService', () => {
  let service: WeatherService;
  let mockHttp;
  let cities: Array<City>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(WeatherService);
    mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
    cities = service.getCities();
    console.log('in run before');
    console.log(cities);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addCity', () => {
    it('should add a city to the list of saved cities'), () => {
      let countBefore = cities.length;
      cities = service.addCity({ "id": 1, "name": "TestCity", "state": "TestState", "country": "TestCountry", "coord": { "lon": 123, "lat": 321 } });
      let countAfter = cities.length;

      // check that there is one extra after adding
      expect(countAfter).toBe(countBefore + 1);

      // check that the values of the last city is the one we added
      expect(cities[countAfter - 1].id).toBe(1);
      expect(cities[countAfter - 1].name).toBe("TestCity");
      expect(cities[countAfter - 1].state).toBe("TestState");
      expect(cities[countAfter - 1].name).toBe("TestCountry");
      expect(cities[countAfter - 1].coord.lon).toBe(123);
      expect(cities[countAfter - 1].coord.lat).toBe(321);
    }
  });

  describe('deleteCity', () => {
    it('should delete a city from the list of saved cities'), () => {
      console.log('testing delete');
      cities = service.addCity({ "id": 1, "name": "TestCity", "state": "TestState", "country": "TestCountry", "coord": { "lon": 123, "lat": 321 } });
      let countBefore = cities.length;
      cities = service.deleteCity(1);
      let countAfter = cities.length;

      // check that there is one less after deleting
      expect(countAfter).toBe(countBefore - 1);

      // check that the city with the details we added is not contained
      expect(cities.filter(city => city.id === 1).length).toBe(0);
      expect(cities.filter(city => city.name === "TestCity").length).toBe(0);
      expect(cities.filter(city => city.state === "TestState").length).toBe(0);
      expect(cities.filter(city => city.country === "TestCountry").length).toBe(0);
      expect(cities.filter(city => city.coord.lon === 123).length).toBe(0);
      expect(cities.filter(city => city.coord.lat === 321).length).toBe(1);
    }
  });

});
