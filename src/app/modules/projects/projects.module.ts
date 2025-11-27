import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { GoHomeButtonComponent } from 'src/app/utils/go-home-button/go-home-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule, RouterModule.forChild([{ path: '', component: ProjectsComponent }]), GoHomeButtonComponent
  ]
})
export class ProjectsModule { }
