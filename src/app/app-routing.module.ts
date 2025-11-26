import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'software-engineer', loadChildren: () => import('./projects/software-engineer/software-engineer.module').then(m => m.SoftwareEngineerModule) },
  { path: 'project-2', loadChildren: () => import('./projects/project2/project2.module').then(m => m.Project2Module) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
