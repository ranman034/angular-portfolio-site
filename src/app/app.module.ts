import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AuthEffects } from './auth/store/auth.effects';

import { environment } from './../environments/environment';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module';
import { ProjectsModule } from './projects/projects.module';
import { PhotosModule } from './photos/photos.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { reducers } from './store/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    HttpModule,
    ProjectsModule,
    PhotosModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
