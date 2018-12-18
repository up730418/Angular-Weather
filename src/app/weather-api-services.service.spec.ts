import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { WeatherApiServicesService } from './weather-api-services.service';

describe('WeatherApiServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
              HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: WeatherApiServicesService = TestBed.get(WeatherApiServicesService);
    expect(service).toBeTruthy();
  });
});
