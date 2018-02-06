import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as PhotosActions from '../store/photos.actions';
// import * as fromPhotos from '../store/photos.reducers';
import * as fromApp from '../../store/app.reducers';

import { Photo } from '../photo.model';

@Injectable()
export class PhotosEffects {
  @Effect()
  photoFetch = this.actions$
    .ofType(PhotosActions.FETCH_PHOTOS)
    .switchMap((action: PhotosActions.FetchPhotos) => {
      return this.httpClient.get<Photo[]>('https://my-portfolio-site-tgr.firebaseio.com/photos.json', {
            observe: 'body',
            responseType: 'json'
          })
    })
    .map(
      (photos) => {
        console.log(photos);
        for (let photo of photos) {
          if (!photo['tags']) {
             photo['tags'] = [];
          }
        }
        return {
          type: PhotosActions.SET_PHOTOS,
          payload: photos
        };
      }
    );

  @Effect({dispatch: false})
  photoStore = this.actions$
    .ofType(PhotosActions.STORE_PHOTOS)
    .withLatestFrom(this.store.select('photos'))
    .switchMap(([action,state]) => {
      let token = "";
      this.store.select('auth').subscribe((data) => { token = data.token; })
      let params = new HttpParams().set('auth', token);
      const req = new HttpRequest('PUT', 'https://my-portfolio-site-tgr.firebaseio.com/photos.json', state.allPhotos, {reportProgress: true, params: params});
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromApp.AppState>) {}
}
