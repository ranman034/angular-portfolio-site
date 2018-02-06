import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { fadeInAnimation } from '../_animations/fade-in.animations';

import { Photo } from './photo.model';

import * as PhotosActions from './store/photos.actions';
import * as fromPhotos from './store/photos.reducers';
import * as fromApp from  '../store/app.reducers';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  // make fade in animation available to this component
   animations: [fadeInAnimation],

   // attach the fade in animation to the host (root) element of this component
   host: { '[@fadeInAnimation]': '' }
})
export class PhotosComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  photosState: Observable<fromPhotos.State>;
  tagsSelected: string[] = [];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
      this.galleryOptions = [
        {
          width: '600px',
          height: '400px',
          imageAutoPlay: true,
          imageAutoPlayInterval: 2500,
          imageAutoPlayPauseOnHover: true,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          previewInfinityMove: true,
          previewKeyboardNavigation: true,
          previewCloseOnClick: true,
          previewCloseOnEsc: true,
          previewSwipe: true,
          previewFullscreen: true
        },
        // max-width 800
        {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
      breakpoint: 400,
      preview: false
    }
    ];

    this.photosState = this.store.select('photos');
    this.photosState.subscribe((state: fromPhotos.State) => {
        this.addGalleryPhotos(state.allPhotos);
    });
  }

  addGalleryPhotos(photos) {
    this.galleryImages = [];
    for (let photo of photos) {
      this.galleryImages.push({
        small: photo.imgSource,
        medium: photo.imgSource,
        big: photo.imgSource,
        description: photo.name
      });
    }
  }

  tagSelected(event,tag) {
    event.target.parentElement.classList.toggle('active');
    let tagIndex = this.tagsSelected.indexOf(tag);
    if (tagIndex===-1){
      this.tagsSelected.push(tag);
    } else {
      this.tagsSelected.splice(tagIndex,1);
    }
    this.store.dispatch(new PhotosActions.FetchPhotosByTags(this.tagsSelected))
    this.photosState.subscribe((state: fromPhotos.State) => {
        this.addGalleryPhotos(state.currentPhotos);
    });
  }
}
