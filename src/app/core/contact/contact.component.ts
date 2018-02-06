import { Component, OnInit } from '@angular/core';

import { fadeInAnimation } from '../../_animations/fade-in.animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  // make fade in animation available to this component
   animations: [fadeInAnimation],

   // attach the fade in animation to the host (root) element of this component
   host: { '[@fadeInAnimation]': '' }
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
