import { Component } from '@angular/core';
import { Router, Event, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: false
})
export class AppComponent {
  title = 'gb-site';
  loading = false;
  constructor(private router: Router){
    this.router.events.subscribe((e: Event) => {
      if (e instanceof RouteConfigLoadStart) { this.loading = true; }
      if (e instanceof RouteConfigLoadEnd) { this.loading = false; }
    });
  }
}
