import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + endpoint)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(() => error)
  }
}
