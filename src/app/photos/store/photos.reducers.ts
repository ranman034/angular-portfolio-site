import * as PhotosActions from './photos.actions';

import { Photo } from '../photo.model';

export interface State {
  allPhotos: Photo[];
  currentPhotos?: Photo[];
  editedPhoto: Photo;
  editedPhotoSlug: string;
  tags: string[];
  tagsSelected: string[];
}

const initialState: State = {
  allPhotos: [
    new Photo(
      "Bird",
      "bird",
      "https://celebrateurbanbirds.org/wp-content/themes/curb/img/newsletter-pigeon.png",
      "https://celebrateurbanbirds.org/wp-content/themes/curb/img/newsletter-pigeon.png",
      [
        "landscape", "animals", "north-america"
      ]),
    new Photo(
      "Dog",
      "dog",
      "https://static.pexels.com/photos/159541/wildlife-photography-pet-photography-dog-animal-159541.jpeg",
      "https://static.pexels.com/photos/159541/wildlife-photography-pet-photography-dog-animal-159541.jpeg",
      [
        "landscape", "people", "north-america"
      ]),
    new Photo(
      "Cat",
      "cat",
      "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
      "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
      [
        "cityscape", "animals", "south-america"
      ])
  ],
  editedPhoto: null,
  editedPhotoSlug: null,
  tags: ["landscape", "cityscape", "animals", "people", "north-america", "south-america"].sort(),
  tagsSelected: []
}

export function photosReducer(state = initialState, action: PhotosActions.PhotosActions) {
  switch(action.type) {
    case PhotosActions.SET_PHOTOS:
      return {
        ...state,
      allPhotos: [...action.payload]
    };
    case PhotosActions.ADD_PHOTO:
      return {
        ...state,
        allPhotos: [...state.allPhotos, action.payload],
      };
    case PhotosActions.UPDATE_PHOTO:
      let photo = null;
      let currIndex = 0;
      state.allPhotos.forEach((currPhoto, index) => {
        if (currPhoto.slug === action.payload.slug){
          photo = currPhoto;
          currIndex = index;
        }
      });
      const updateProject = {
        ...photo,
        ...action.payload.updatedPhoto
      };
      const photos = [...state.allPhotos];
      photos[currIndex] = updateProject;
      return {
        ...state,
        allPhotos: photos,
        editedPhoto: null,
        editedPhotoSlug: null
      };
    case PhotosActions.UPDATE_TAGS:
      let photosToCheck = [...state.allPhotos];
      let updatedTags = [];
      photosToCheck.forEach((photo, index) => {
        photo.tags.forEach((currTag, index) => {
          if (!updatedTags.includes(currTag)){
            updatedTags.push(currTag);
          }
        });
      })
      return {
        ...state,
        tags: updatedTags.sort()
      };
    case PhotosActions.DELETE_PHOTO:
      const newPhotos = [...state.allPhotos];
      let delIndex = 0;
      newPhotos.forEach((photo, currIndex) => {
        if (photo.slug == action.payload) {
          delIndex = currIndex;
        }
      })
      newPhotos.splice(delIndex,1);
      return {
        ...state,
        allPhotos: newPhotos,
      };
    case PhotosActions.FETCH_PHOTOS_BY_TAGS:
      const allPhotos = [...state.allPhotos];
      const tags = action.payload;
      const photosByTag = [];
      let selectedTagIndex = 0;
      let allTags = true;
      for (let photo of allPhotos){
        while(allTags && selectedTagIndex < tags.length) {
          if (photo.tags.indexOf(tags[selectedTagIndex])===-1) {
            allTags = false;
          }
          selectedTagIndex++;
        }
        if (allTags) {
          photosByTag.push(photo);
        }
        selectedTagIndex = 0;
        allTags = true;
      }
      return {
        ...state,
        currentPhotos: photosByTag,
        tagsSelected: state.tagsSelected
      }
    default:
      return state;
  }
}
