import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://localhost:7244/api/events'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all events
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Get event by ID
  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`).pipe(catchError(this.handleError));
  }

  // Create a new event
  createEvent(event: Event): Observable<string> {
    return this.http.post<string>(this.apiUrl, event).pipe(catchError(this.handleError));
  }

  // Update an existing event
  updateEvent(eventId: string, event: Event): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}`, event).pipe(catchError(this.handleError));
  }

  // Delete an event
  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}`).pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
