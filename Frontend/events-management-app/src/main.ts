import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { EventService } from './app/event.service';
// import { provideHttpClient } from '@angular/common/http';


// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(), // Required for HttpClient
//     EventService, // Register your EventService here
//   ],
// });

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
