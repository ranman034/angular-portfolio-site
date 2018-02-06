import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { fadeInAnimation } from '../_animations/fade-in.animations';

import { Project } from './project/project.model';

import * as ProjectsActions from './store/projects.actions';
import * as fromProjects from './store/projects.reducers';
import * as fromApp from  '../store/app.reducers';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  // make fade in animation available to this component
  animations: [fadeInAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class ProjectsComponent implements OnInit {
  projectsState: Observable<fromProjects.State>;
  projects: Project[];
  projectSelected: Project;
  tagsSelected: string[] = [];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // initialize project state to retrieve projects
    this.projectsState = this.store.select('projects');
    this.projectsState.subscribe((state: fromProjects.State) => {
        this.projects = state.projects;
    });
  }

  scroll(project, el) {
      if (this.projectSelected != null && project.name == this.projectSelected.name){
        this.projectSelected = null;
      } else{
        this.projectSelected = project;
      }
      setTimeout(() => {
        el.scrollIntoView({
          behavoir: "smooth",
          block: "start"
        });
      }, 5);
  }

  // Fetch projects by selected tags
  tagSelected(event,tag) {
    event.target.parentElement.classList.toggle('active');
    let tagIndex = this.tagsSelected.indexOf(tag);
    if (tagIndex===-1){
      this.tagsSelected.push(tag);
    } else {
      this.tagsSelected.splice(tagIndex,1);
    }
    this.store.dispatch(new ProjectsActions.FetchProjectsByTags(this.tagsSelected))
    this.projectsState.subscribe((state: fromProjects.State) => {
        this.projects = state.currentProjects;
    });
  }

}
