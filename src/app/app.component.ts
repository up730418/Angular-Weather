import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatInput, MatCard } from '@angular/material';
import { WeatherApiServicesService } from './weather-api-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Angular-Weather';
  dataForCity = '';
  displayedColumns: string[] = ['cityName', 'temp', 'conditions'];
  lat = 51.509865;
  long = -0.118092;
  cnt = 20;
  weatherDataSource: MatTableDataSource<WeatherData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /* Start chart.js options */
  meanLineChartData: any = {data: [], label: 'Median average global temperature °C'};
  cityLineChartData: any = {data: [], label: 'City Temp °C', showLine: false};

  // Add some default data for the chart so it looks nice before the data arives
  lineChartData: Array<any> = [ {data: [], label: 'Mean Temp °C'}, {data: [], label: 'City Temp °C', showLine: false}];

  lineChartLabels: Array<any> = [];
  lineChartOptions: any = {
    responsive: true,
  };

  // Setup colours of the lines
  lineChartColors: Array<any> = [
    { // green
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(8, 137, 38, 0.65)',
      pointBackgroundColor: 'rgba(8, 137, 38, 0.65)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Blue
      backgroundColor: 'rgba(63, 81, 181, 0.9)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];

  lineChartLegend = true;
  lineChartType = 'line';
  /* End chart.js options */
  constructor(private weatherApiService: WeatherApiServicesService, ) { }

  ngOnInit() {
    // Get Current weatehr data
    this.getCitysInRadius(this.lat, this.long, this.cnt);
  }

  getCitysInRadius(lat: number, lon: number, cnt: number) {
    const newDataSource: Array<WeatherData> = [];
    this.resetLineChartData();
    // Use weatehrServices to get api response
    this.weatherApiService.getWeatherAroundCoOrdinates(lat, lon, cnt)
      .subscribe((response) => {
        response['list'].forEach((data) => {
          newDataSource.push({cityName: data['name'],
                                temp: data['main']['temp'],
                                conditions: data['weather'][0]['description']});
          // Unable to find median average global temperature so
          // using a default for now
          this.addLineChartData(data['name'], data['main']['temp'], 7.56);
          // Need to add error handler if no response
        });
        // Put data into table compatable model
        this.weatherDataSource = new MatTableDataSource(newDataSource);
        this.weatherDataSource.paginator = this.paginator;
        this.weatherDataSource.sort = this.sort;

        // Update data in chart
        this.lineChartData = [this.meanLineChartData, this.cityLineChartData];
      });
  }
  // Remove all data from line chart
  resetLineChartData() {
    this.lineChartLabels = [];
    this.cityLineChartData.data = [];
    this.meanLineChartData.data = [];
  }

  addLineChartData(label, temp, meanTemp) {
    this.lineChartLabels.push(label);
    this.cityLineChartData.data.push(temp);
    this.meanLineChartData.data.push(meanTemp);
  }

  // Used for filtering paginated table data
  applyFilter(filterValue: string) {
    this.weatherDataSource.filter = filterValue.trim().toLowerCase();

    if (this.weatherDataSource.paginator) {
      this.weatherDataSource.paginator.firstPage();
    }
  }


}

// Weather table stuff
export interface WeatherData {
  cityName: string;
  temp: number;
  conditions: string;
}

