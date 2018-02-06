import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Project } from '../project/project.model';

import * as ProjectsActions from '../store/projects.actions';
import * as fromProjects from '../store/projects.reducers';
import * as fromApp from  '../../store/app.reducers';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectsState: Observable<fromProjects.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.projectsState = this.store.select('projects');
  }

  onSaveData() {
    this.store.dispatch(new ProjectsActions.StoreProjects());
  }

}
