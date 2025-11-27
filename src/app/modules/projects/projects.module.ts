import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { GoHomeButtonComponent } from 'src/app/utils/go-home-button/go-home-button.component';
import { RouterModule } from '@angular/router';
import { CollapseBlockComponent } from "src/app/utils/collapse-block/collapse-block.component";

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule, RouterModule.forChild([{ path: '', component: ProjectsComponent }]), GoHomeButtonComponent,
    CollapseBlockComponent
]
})
export class ProjectsModule { }
