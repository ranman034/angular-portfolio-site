import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { DbCredentionals } from './app.component.dbcred';

import * as firebase from 'firebase';

import * as ProjectsActions from './projects/store/projects.actions';
import * as PhotosActions from './photos/store/photos.actions';
import * as fromApp from  './store/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dbCreds = new DbCredentionals();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    // Initialize connection to firebase backend
    firebase.initializeApp({
      apiKey: this.dbCreds.getApiKey(),
      authDomain: this.dbCreds.getAuthDomain()
    });
    // retrieve photographs and projects from database
    this.store.dispatch(new PhotosActions.FetchPhotos());
    this.store.dispatch(new ProjectsActions.FetchProjects());
  }
}
