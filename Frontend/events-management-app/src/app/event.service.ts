import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root', // This ensures it's globally available if no other `providers` are specified
})
export class EventService {
  private apiUrl = 'https://localhost:7244/api/events'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
}
