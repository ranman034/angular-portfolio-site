import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../auth/store/auth.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  public navCollapse: boolean = false;
  public menuCollapse: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.onWindowResize();
  }

  @HostListener("window:scroll", [])
  onWindowScroll(event){
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 25) {
      this.navCollapse = true;
    } else if (this.navCollapse && number < 25) {
      this.navCollapse = false;
    }
  }

  @HostListener("window:resize", [])
  onWindowResize(){
    if (window.screen.width > 768) {
      this.menuCollapse = true;
    } else {
      this.menuCollapse = false;
    }
  }

  onCollapse() {
    this.menuCollapse = !this.menuCollapse;
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
