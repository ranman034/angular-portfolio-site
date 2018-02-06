import { Action } from '@ngrx/store';

import { Photo } from '../../photos/photo.model';
import { Project } from '../project/project.model';

export const ADD_PROJECT = 'ADD_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECTS_BY_TAGS = 'FETCH_PROJECTS_BY_TAGS';
export const SET_PROJECTS = 'SET_PROJECTS';
export const STORE_PROJECTS = 'STORE_PROJECTS';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const UPDATE_TAGS = 'UPDATE_TAGS';

export class AddProject implements Action {
  readonly type = ADD_PROJECT;

  constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type = DELETE_PROJECT;

  constructor(public payload: string) {}
}

export class FetchProjects implements Action {
  readonly type = FETCH_PROJECTS;
}

export class FetchProjectsByTags implements Action {
  readonly type = FETCH_PROJECTS_BY_TAGS;

  constructor(public payload: string[]) {}
}

export class SetProjects implements Action {
  readonly type = SET_PROJECTS;

  constructor(public payload: Project[]) {}
}

export class StoreProjects implements Action {
  readonly type = STORE_PROJECTS;
}

export class UpdateProject implements Action {
  readonly type = UPDATE_PROJECT;

  constructor(public payload: {slug: string, updatedProject: Project}) {}
}

export class UpdateTags implements Action {
  readonly type = UPDATE_TAGS;

  constructor(public payload: {tags: string[]}) {}
}

export type ProjectsActions = AddProject  | DeleteProject | FetchProjects | FetchProjectsByTags | SetProjects | StoreProjects | UpdateProject | UpdateTags;
