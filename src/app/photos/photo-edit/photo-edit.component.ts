import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromPhotos from '../store/photos.reducers';
import * as PhotosActions from '../store/photos.actions';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  slug: string;
  editMode = false;
  photoForm: FormGroup;
  photosState: Observable<fromPhotos.State>;
  forbiddenSlugs: string[] = ['new'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.photosState = this.store.select('photos');
    this.photosState.subscribe((state: fromPhotos.State) => {
        for (let photo of state.allPhotos) {
          this.forbiddenSlugs.push(photo.slug);
        }
    });
    this.route.params
    .subscribe(
      (params: Params) => {
        this.slug = params['slug'];
        this.editMode = params['slug'] != "new" && params['slug'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (!(this.photoForm.value.tags instanceof Array)) {
      this.photoForm.value.tags = this.photoForm.value.tags.split(',');
    }

    if (this.editMode) {
      this.store.dispatch(new PhotosActions.UpdatePhoto({slug:this.slug,updatedPhoto:this.photoForm.value}));
    } else {
      this.store.dispatch(new PhotosActions.AddPhoto(this.photoForm.value));
    }
      this.store.dispatch(new PhotosActions.UpdateTags({tags:this.photoForm.value.tags}));
      this.onCancel();
    }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onDelete() {
    this.store.dispatch(new PhotosActions.DeletePhoto(this.photoForm.value.slug));
    this.store.dispatch(new PhotosActions.UpdateTags({tags:this.photoForm.value.tags}));
    this.onCancel();
  }

  private initForm() {
    let photoName = '';
    let photoSlug = '';
    let photoImgSource = '';
    let photoTmbSource = '';
    let photoTags = '';

    if (this.editMode) {
      this.store.select('photos')
        .take(1)
        .subscribe((photosState: fromPhotos.State) => {
          let photo = null;
          photosState.allPhotos.forEach((currPhoto, index) => {
            if (currPhoto.slug === this.slug){
              photo = currPhoto;
            }
          });
          photoName = photo.name;
          photoSlug = photo.slug;
          photoImgSource = photo.imgSource;
          photoTmbSource = photo.tmbSource;
          photoTags = photo.tags;
        });
    }

    this.photoForm = new FormGroup({
      'name': new FormControl(photoName, Validators.required),
      'slug': new FormControl(photoSlug, [Validators.required, this.forbiddenPhotoSlugNames.bind(this)]),
      'imgSource': new FormControl(photoImgSource, Validators.required),
      'tmbSource': new FormControl(photoTmbSource),
      'tags': new FormControl(photoTags, Validators.required)
    });
  }

  // Does not allow multiple photographs to have the same slug
  forbiddenPhotoSlugNames(control: FormControl): {[s: string]: boolean} {
    if (!this.editMode) {
      if (this.forbiddenSlugs.indexOf(control.value) !== -1){
        return {'slugIsForbidden': true}
      }
    } return null;
  }

}
