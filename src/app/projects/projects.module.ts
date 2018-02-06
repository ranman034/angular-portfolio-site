import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ProjectsEffects } from './store/projects.effects';

import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';

import { SharedModule } from '../shared/shared.module';

import { projectsReducer } from './store/projects.reducers';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    ProjectEditComponent,
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('projects', projectsReducer),
    EffectsModule.forFeature([ProjectsEffects])
  ]
})
export class ProjectsModule {}
