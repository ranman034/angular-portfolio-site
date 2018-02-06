import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromPhotos from '../photos/store/photos.reducers';
import * as fromProjects from '../projects/store/projects.reducers';

export interface AppState {
  auth: fromAuth.State,
  photos: fromPhotos.State,
  projects: fromProjects.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  photos: fromPhotos.photosReducer,
  projects: fromProjects.projectsReducer
};
