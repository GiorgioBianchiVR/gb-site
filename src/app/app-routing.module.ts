import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'work', loadChildren: () => import('./modules/software-engineer/software-engineer.module').then(m => m.SoftwareEngineerModule) },
  { path: 'education', loadChildren: () => import('./modules/education/education.module').then(m => m.EducationModule) },
  { path: 'projects', loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'inchiostro', loadChildren: () => import('./modules/inchiostro/inchiostro.module').then(m => m.InchiostroModule) },
  { path: 'passions', loadChildren: () => import('./modules/passions/passions.module').then(m => m.PassionsModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
