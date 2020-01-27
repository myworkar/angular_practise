import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  handleError(error) {
    return throwError(error.error);
  }

  get(url: string): Observable<any> {
    return this.http.get(url).pipe(
      //retry(2),
      catchError(this.handleError)
    );
  }

  post(url: string, body: {}) {
    return this.http.post(url, body).pipe(
      //retry(2),
      catchError(this.handleError)
    );
  }

  put(url: string, body: {}) {
    return this.http.put(url, body).pipe(
      //retry(2),
      catchError(this.handleError)
    );
  }

}
