import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project1Component } from './project1.component';

@NgModule({
  declarations: [Project1Component],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: Project1Component }])]
})
export class Project1Module {}
