import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Film, DashboardGroup, Team, Planet, Measurements, Resident } from './dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  measurementOptionsMap: any = {};

  constructor(private apiService: ApiService) { }

  getGroupsOptions() {

    const url = 'https://swapi.dev/api/films/';
    return this.apiService.get(url).pipe(map(
      (resp: any) => {
        return this.fixGroupData(resp.results);
      }
      // TODO1: create a message service and add an error pop up on err 
    ));
  }

  fixGroupData(films: Film[]): DashboardGroup[] {
    const groupOptions: DashboardGroup[] = films.map((film: Film) => {
      return { label: film.title, url: film.url };
    });

    return groupOptions;
  }



  getMeasurmentData(group: string) {
    const url = group;

    return this.apiService.get(url).pipe(map(
      (resp: any) => {

        return this.fixMeasurmentData(resp.planets);

      }
      // TODO1: create a message service and add an error pop up on err 
    ));
  }

  fixMeasurmentData(planets: string[]): readonly Measurements[] {
    return planets.map((planet) => {

      const subStr = planet.substring(0, planet.length - 1);
      const number = subStr.substring(subStr.lastIndexOf('/') + 1);

      return { label: `planet ${number}`, url: planet }
    })
  }



  getDashboardData(group: string, measurement: string) {
    const url = measurement;
    return this.apiService.get(url).pipe(switchMap(
      (resp: any) => {
        return this.createDashboardDataRequest(resp).pipe(map(
          (residents: Resident[]) => {
            return this.fixDashboardData(residents);
          }
        ));
      }
      // TODO1: create a message service and add an error pop up on err 
    ));;
  }

  createDashboardDataRequest(planet: Planet): Observable<Resident[]> {
    if (planet.residents.length === 0) {
      return of([]);
    }

    var observables: Observable<any>[] = planet.residents.map((url: string) => {
      return this.apiService.get(url);
    });

    return forkJoin(observables);
  }

  fixDashboardData(residents: Resident[]): Team[] {
    const teams: Team[] = residents.map((resident: Resident, index) => {
      const name = resident.name;
      const today = resident.height / 250;
      const mtd = resident.mass !== 'unknown' ? resident.mass / 150 : 0;
      const ytd = resident.films.length / 6;
      const todayClass = this.getTextClass(today);
      const mtdClass = this.getTextClass(mtd);
      const ytdClass = this.getTextClass(ytd);
      return { today, mtd, ytd, todayClass, mtdClass, ytdClass, name };
    });
    return teams;
  }

  getTextClass(num: number) {
    if (num < 0.3) {
      return 'text--error';
    }
    if (num < 0.5) {
      return 'text--warning';
    }
    if (num > 0.7) {
      return 'text--success';
    }
    return '';
  }


}
