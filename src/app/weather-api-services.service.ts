import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { AppConstant } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WeatherApiServicesService {

  constructor(private http: HttpClient) { }
  
  getCityWeather(city: string) {
    const urlToGet = `${AppConstant.WEATHER_API_URL}weather?q=${city}&units=metric&appId=${AppConstant.WEATHER_API_KEY}`;
    return this.http.get(urlToGet)
  }
  
  getWeatherAroundCoOrdinates(lat: number, lon: number, cnt: number) {
    const urlToGet = `${AppConstant.WEATHER_API_URL}find?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appId=${AppConstant.WEATHER_API_KEY}`;
    return this.http.get(urlToGet)
  }
}

