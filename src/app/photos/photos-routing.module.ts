import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { PhotoListComponent } from './photo-list/photo-list.component';

import { AuthGuard} from '../auth/auth-guard.service';

const photosRoutes: Routes = [
  { path: 'photo-list', component: PhotoListComponent, canActivate: [AuthGuard], children: [
    { path: 'new', redirectTo: 'new/edit', canActivate: [AuthGuard]},
    { path: ':slug/edit', component: PhotoEditComponent, canActivate: [AuthGuard]},
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(photosRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class PhotosRoutingModule {}
