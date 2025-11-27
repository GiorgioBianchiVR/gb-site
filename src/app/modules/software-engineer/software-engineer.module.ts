import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SoftwareEngineerComponent } from './software-engineer.component';
import { GoHomeButtonComponent } from "src/app/utils/go-home-button/go-home-button.component";

@NgModule({
  declarations: [SoftwareEngineerComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: SoftwareEngineerComponent }]), GoHomeButtonComponent]
})
export class SoftwareEngineerModule {}
