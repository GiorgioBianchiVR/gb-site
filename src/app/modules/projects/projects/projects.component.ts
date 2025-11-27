import { Component } from '@angular/core';
import { CollapseService } from 'src/app/services/collapse.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass',
  standalone: false
})
export class ProjectsComponent {

  constructor(private collapseService: CollapseService) {
    this.collapseService.initializeSections('assets/data/projects.json');
  }

}
