import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-project-placeholder',
    templateUrl: './project-placeholder.component.html',
    styleUrls: ['./project-placeholder.component.scss'],
    standalone: false
})
export class ProjectPlaceholderComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
