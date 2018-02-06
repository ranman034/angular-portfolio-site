import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';

import { DropdownDirective } from './dropdown.directive';

import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  declarations: [
    FooterComponent,
    DropdownDirective
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    FooterComponent,
    NgxGalleryModule
  ]
})
export class SharedModule {}
