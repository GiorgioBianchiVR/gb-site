import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectPlaceholderComponent } from './project-placeholder.component';

@NgModule({
  declarations: [ProjectPlaceholderComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: ProjectPlaceholderComponent }])]
})
export class Project2Module {}
