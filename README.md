# MyPortfolioApp

A customizable angular porfolio site.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[Install the Angular CLI and set up a new project](https://angular.io/guide/quickstart)

Set up a new [Firebase](https://firebase.google.com/) project

Enabled the **Email/Password** Authentication on your project

Set **Database** -> **Rules** of your project to
```
{
  "rules": {
    ".read": "true",
    ".write": "auth != null"
  }
}
```
Under **Project Settings** you will find your ***ApiKey*** and ***AuthDomain***

### Dependencies

```
  "dependencies": {
    "@angular/animations": "^5.0.2",
    "@angular/common": "^5.0.0",
    "@angular/compiler": "^5.0.0",
    "@angular/core": "^5.0.0",
    "@angular/forms": "^5.0.0",
    "@angular/http": "^5.0.0",
    "@angular/platform-browser": "^5.0.0",
    "@angular/platform-browser-dynamic": "^5.0.0",
    "@angular/router": "^5.0.2",
    "@ngrx/effects": "^4.1.1",
    "@ngrx/router-store": "^4.1.1",
    "@ngrx/store": "^4.1.1",
    "@ngrx/store-devtools": "^4.1.1",
    "bootstrap": "^4.0.0-alpha.6",
    "core-js": "^2.4.1",
    "firebase": "^4.7.0",
    "font-awesome": "^4.7.0",
    "hammerjs": "^2.0.8",
    "ngx-gallery": "^3.1.3",
    "rxjs": "^5.5.2",
    "web-animations-js": "^2.3.1",
    "zone.js": "^0.8.14"
  }
```

### Code Setup

Set the values for your ***ApiKey*** and ***AuthDomain*** in the *app.component.ts* file
```
  firebase.initializeApp({
      apiKey: "SomeApiKey",
      authDomain: "some-auth-domain.firebaseio.com"
    });
```


### Built With

* [ngx-gallery](https://github.com/lukasz-galka/ngx-gallery) - Angular image gallery plugin
* [Grayscale](https://startbootstrap.com/template-overviews/grayscale/) - A free, multipurpose, one page Bootstrap theme featuring a dark color scheme and smooth scrolling animations.
* [Bootstrap](https://getbootstrap.com/)

## Deployment

[Angular Deployment](https://angular.io/guide/deployment)

### Angular Setup Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Acknowledgments

* Maximilian Schwarzmüller's course on [Udemy.com](https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/content)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
