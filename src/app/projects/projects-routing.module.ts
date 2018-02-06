import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';

import { AuthGuard} from '../auth/auth-guard.service';

const projectsRoutes: Routes = [
  { path: 'project-list', component: ProjectListComponent, canActivate: [AuthGuard], children: [
    { path: 'new', redirectTo: 'new/edit', canActivate: [AuthGuard] },
    { path: ':slug/edit', component: ProjectEditComponent, canActivate: [AuthGuard] },
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class ProjectsRoutingModule {}
