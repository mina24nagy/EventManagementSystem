import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Ensure this import is present
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],  // Ensure CommonModule is included
  template: `
    <div class="container">
      <button class="create-btn" (click)="createEvent()">Create Event</button>
      <div class="event-grid">
        <div class="event-card" *ngFor="let event of events">
          <h2>{{ event.Name }}</h2>
          <p>{{ event.Description }}</p>
          <p><strong>Start:</strong> {{ event.StartDate | date:'short' }}</p>
          <p><strong>End:</strong> {{ event.EndDate | date:'short' }}</p>
          <p><strong>Location:</strong> {{ event.Location }}</p>
          <div class="actions">
            <button (click)="editEvent(event)">Edit</button>
            <button (click)="deleteEvent(event.EventId)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }

    .create-btn {
      padding: 10px 20px;
      margin-bottom: 20px;
      font-size: 16px;
      background-color: #007BFF;
      color: white;
      border: none;
      cursor: pointer;
    }

    .event-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 10px 0;
    }

    .event-card {
      border: 1px solid #ddd;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .actions button {
      padding: 5px 10px;
      cursor: pointer;
      font-size: 14px;
      border: none;
      background-color: #007BFF;
      color: white;
      border-radius: 5px;
    }

    .actions button:nth-child(2) {
      background-color: #dc3545; /* Red for delete */
    }
  `]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        console.log('Events received:', data); // Verify data in console
        this.events = data; // Assign data to events array
      },
      (error) => {
        console.error('Error while fetching events:', error);
      }
    );
  }

  createEvent(): void {
    // Handle creating a new event (you can navigate to a form or show a modal)
    console.log('Create new event');
  }

  editEvent(event: Event): void {
    // Handle editing the event (navigate to edit form or show a modal)
    console.log('Editing event', event);
  }

  deleteEvent(eventId: string): void {
    // Handle deleting the event
    console.log('Deleting event with ID:', eventId);
  }
}
