import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import * as firebase from 'firebase';

import { fromPromise } from 'rxjs/observable/fromPromise';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(["/signin"]);
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

    @Effect()
    authSignin = this.actions$
      .ofType(AuthActions.TRY_SIGIN)
      .map((action: AuthActions.TrySignin) => {
        return action.payload;
      })
      .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      })
      .switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      })
      .mergeMap((token: string) => {
        this.router.navigate(["/project-list"]);
        return [
          {
            type: AuthActions.SIGNIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      });

    @Effect({dispatch: false})
    authLogout = this.actions$
      .ofType(AuthActions.LOGOUT)
      .do(()=> {
        this.router.navigate(['/']);
      })

  constructor (private actions$: Actions, private router: Router) {

  }
}
