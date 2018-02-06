import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { PhotosEffects } from './store/photos.effects';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { PhotosComponent } from './photos.component';
import { PhotosRoutingModule } from './photos-routing.module';

import { SharedModule } from '../shared/shared.module';

import { ListifyPipe } from './listify.pipe';

import { photosReducer } from './store/photos.reducers';

@NgModule({
  declarations: [
    ListifyPipe,
    PhotoListComponent,
    PhotoEditComponent,
    PhotosComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('photos', photosReducer),
    EffectsModule.forFeature([PhotosEffects])
  ]
})
export class PhotosModule {}
