import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppRoutingModule,
    NavbarComponent
  ],
  providers: [
  ]
})
export class CoreModule {}
