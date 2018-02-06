import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { fadeInAnimation } from '../../_animations/fade-in.animations';

import { Project } from './project.model';
import { Photo } from '../../photos/photo.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  // make fade in animation available to this component
   animations: [fadeInAnimation],

   // attach the fade in animation to the host (root) element of this component
   host: { '[@fadeInAnimation]': '' }
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() index: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
            {
                width: '100%',
                height: '100px',
                image: false,
                imageAutoPlay: true,
                imageAutoPlayInterval: 4000,
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
                height: '75px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            }
        ];

        for (let photo of this.project.screenshots) {
          this.galleryImages.push({
            small: photo.imgSource,
            medium: photo.imgSource,
            big: photo.imgSource,
            description: photo.name
          });
        }
  }
}
