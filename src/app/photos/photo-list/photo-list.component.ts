import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Photo } from '../photo.model';

import * as PhotosActions from '../store/photos.actions';
import * as fromPhotos from '../store/photos.reducers';
import * as fromApp from  '../../store/app.reducers';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photosState: Observable<fromPhotos.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.photosState = this.store.select('photos');
  }

  onSaveData() {
    this.store.dispatch(new PhotosActions.StorePhotos());
  }

}
