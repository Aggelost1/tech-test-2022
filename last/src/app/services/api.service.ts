import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string, options?: any) {
    return this.http.get(url, options);
  }

  delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }

  post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  patch(url: string, data: any, options?: any) {
    return this.http.patch(url, data, options);
  }

}
