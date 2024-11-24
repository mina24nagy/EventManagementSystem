import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>{{ isEditMode ? 'Edit Event' : 'Create Event' }}</h2>
    <form [formGroup]="eventForm" (ngSubmit)="onSubmit()">
      <label>
        Name:
        <input formControlName="name" />
      </label>
      <label>
        Description:
        <textarea formControlName="description"></textarea>
      </label>
      <label>
        Start Date:
        <input type="date" formControlName="startDate" />
      </label>
      <label>
        End Date:
        <input type="date" formControlName="endDate" />
      </label>
      <label>
        Location:
        <input formControlName="location" />
      </label>
      <label>
        Capacity:
        <input type="number" formControlName="capacity" />
      </label>
      <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
    </form>
  `,
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  isEditMode = false;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: [''],
      capacity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEditMode = true;
      this.eventService.getEventById(this.eventId).subscribe({
        next: (event) => this.eventForm.patchValue(event),
        error: (err) => console.error('Error fetching event:', err),
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.invalid) return;

    const event: Event = this.eventForm.value;

    if (this.isEditMode) {
      this.eventService.updateEvent(this.eventId!, event).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error updating event:', err),
      });
    } else {
      this.eventService.createEvent(event).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error creating event:', err),
      });
    }
  }
}
