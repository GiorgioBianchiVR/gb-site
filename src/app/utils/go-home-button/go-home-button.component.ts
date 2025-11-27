import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-home-button',
  imports: [],
  templateUrl: './go-home-button.component.html',
  styleUrl: './go-home-button.component.sass',
})
export class GoHomeButtonComponent {
  constructor(private router: Router) {  }

  goHome() {
    this.router.navigate(['/']);
  }

}
