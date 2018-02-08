import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as ProjectsActions from '../store/projects.actions';
// import * as fromProjects from '../store/projects.reducers';
import * as fromApp from '../../store/app.reducers';

import { Project } from '../project/project.model';

@Injectable()
export class ProjectsEffects {
  @Effect()
  projectFetch = this.actions$
    .ofType(ProjectsActions.FETCH_PROJECTS)
    .switchMap((action: ProjectsActions.FetchProjects) => {
      return this.httpClient.get<Project[]>('https://my-portfolio-site-tgr.firebaseio.com/projects.json', {
            observe: 'body',
            responseType: 'json'
          })
    })
    .map(
      (projects) => {
        return {
          type: ProjectsActions.SET_PROJECTS,
          payload: projects
        };
      }
    );

  @Effect({dispatch: false})
  projectStore = this.actions$
    .ofType(ProjectsActions.STORE_PROJECTS)
    .withLatestFrom(this.store.select('projects'))
    .switchMap(([action,state]) => {
      let token = "";
      this.store.select('auth').subscribe((data) => { token = data.token; })
      let params = new HttpParams().set('auth', token);
      const req = new HttpRequest('PUT', 'https://my-portfolio-site-tgr.firebaseio.com/projects.json', state.projects, {reportProgress: true, params: params});
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromApp.AppState>) {}
}
