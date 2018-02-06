import { Action } from '@ngrx/store';

import { Photo } from '../photo.model';

export const ADD_PHOTO = 'ADD_PHOTO';
export const DELETE_PHOTO = 'DELETE_PHOTO';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';
export const FETCH_PHOTOS_BY_TAGS = 'FETCH_PHOTOS_BY_TAGS';
export const SET_PHOTOS = 'SET_PHOTOS';
export const STORE_PHOTOS = 'STORE_PHOTOS';
export const UPDATE_PHOTO = 'UPDATE_PHOTO';
export const UPDATE_TAGS = 'UPDATE_TAGS';

export class AddPhoto implements Action {
  readonly type = ADD_PHOTO;

  constructor(public payload: Photo) {}
}

export class DeletePhoto implements Action {
  readonly type = DELETE_PHOTO;

  constructor(public payload: string) {}
}

export class FetchPhotos implements Action {
  readonly type = FETCH_PHOTOS;
}

export class FetchPhotosByTags implements Action {
  readonly type = FETCH_PHOTOS_BY_TAGS;

  constructor(public payload: string[]) {}
}

export class SetPhotos implements Action {
  readonly type = SET_PHOTOS;

  constructor(public payload: Photo[]) {}
}

export class StorePhotos implements Action {
  readonly type = STORE_PHOTOS;
}

export class UpdatePhoto implements Action {
  readonly type = UPDATE_PHOTO;

  constructor(public payload: {slug: string, updatedPhoto: Photo}) {}
}

export class UpdateTags implements Action {
  readonly type = UPDATE_TAGS;

  constructor(public payload: {tags: string[]}) {}
}

export type PhotosActions = AddPhoto | DeletePhoto | FetchPhotos | FetchPhotosByTags | SetPhotos | StorePhotos | UpdatePhoto | UpdateTags;
