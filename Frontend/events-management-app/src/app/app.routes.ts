import { Route } from '@angular/router';


export const appRoutes: Route[] = [
  { path: '', loadComponent: () => import('./event-list/event-list.component').then(m => m.EventListComponent) },
  { path: 'create', loadComponent: () => import('./event-form/event-form.component').then(m => m.EventFormComponent) },
  { path: 'edit/:id', loadComponent: () => import('./event-form/event-form.component').then(m => m.EventFormComponent) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
