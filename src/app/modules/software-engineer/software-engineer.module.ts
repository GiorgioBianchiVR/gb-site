import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SoftwareEngineerComponent } from './software-engineer.component';

@NgModule({
  declarations: [SoftwareEngineerComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: SoftwareEngineerComponent }])]
})
export class SoftwareEngineerModule {}
