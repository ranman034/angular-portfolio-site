import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromProjects from '../store/projects.reducers';
import * as ProjectsActions from '../store/projects.actions';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  slug: string;
  editMode = false;
  projectForm: FormGroup;
  projectsState: Observable<fromProjects.State>;
  forbiddenSlugs: string[] = ['new'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // initialize project state to retrieve all project slugs
    this.projectsState = this.store.select('projects');
    this.projectsState.subscribe((state: fromProjects.State) => {
        for (let project of state.projects) {
          this.forbiddenSlugs.push(project.slug);
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
    if (!(this.projectForm.value.tags instanceof Array)) {
      this.projectForm.value.tags = this.projectForm.value.tags.split(',');
    }

    if (this.editMode) {
      this.store.dispatch(new ProjectsActions.UpdateProject({slug:this.slug,updatedProject:this.projectForm.value}));
    } else {
      this.store.dispatch(new ProjectsActions.AddProject(this.projectForm.value));
    }
      this.store.dispatch(new ProjectsActions.UpdateTags({tags:this.projectForm.value.tags}));
      this.onCancel();
    }


  onAddScreenshot() {
    (<FormArray>this.projectForm.get('screenshots')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'slug': new FormControl(null, Validators.required),
        'imgSource': new FormControl(null, Validators.required),
        'tmbSource': new FormControl(null)
      })
    );
  }

  onDeleteScreenshot(index: number) {
    (<FormArray>this.projectForm.get('screenshots')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onDelete() {
    this.store.dispatch(new ProjectsActions.DeleteProject(this.projectForm.value.slug));
    this.store.dispatch(new ProjectsActions.UpdateTags({tags:this.projectForm.value.tags}));
    this.onCancel();
  }

  private initForm() {
    let projectName = '';
    let projectSlug = '';
    let projectYear = '1900';
    let projectDescription = '';
    let projectDescriptionStyling = false;
    let projectDatabase = '';
    let projectFrontEnd = '';
    let projectBackEnd = '';
    let projectWebServer = '';
    let projectPaas = '';
    let projectVersionControl = '';
    let projectBuildTool = '';
    let projectStyling = '';
    let projectDatabaseStyling = false;
    let projectFrontEndStyling = false;
    let projectBackEndStyling = false;
    let projectWebServerStyling = false;
    let projectPaasStyling = false;
    let projectVersionControlStyling = false;
    let projectBuildToolStyling = false;
    let projectStylingStyling = false;
    let projectScreenshots = new FormArray([]);
    let projectTags = '';

    if (this.editMode) {
      this.store.select('projects')
        .take(1)
        .subscribe((projectsState: fromProjects.State) => {
          let project = null;
          projectsState.projects.forEach((currProject, index) => {
            if (currProject.slug === this.slug){
              project = currProject;
            }
          });
          projectName = project.name;
          projectSlug = project.slug;
          projectYear = project.year;
          projectDescription = project.description;
          projectDescriptionStyling = project.descriptionStyling;
          projectDatabase = project.database;
          projectFrontEnd = project.frontEnd;
          projectBackEnd = project.backEnd;
          projectWebServer = project.webServer;
          projectPaas = project.paas;
          projectVersionControl = project.versionControl;
          projectBuildTool = project.buildTool;
          projectStyling = project.styling;
          projectDatabaseStyling = project.databaseStyling;
          projectFrontEndStyling = project.frontEndStyling;
          projectBackEndStyling = project.backEndStyling;
          projectWebServerStyling = project.webServerStyling;
          projectPaasStyling = project.paasStyling;
          projectVersionControlStyling = project.versionControlStyling;
          projectBuildToolStyling = project.buildToolStyling;
          projectStylingStyling = project.stylingStyling;
          if (project['screenshots']) {
            for (let screenshot of project.screenshots) {
              projectScreenshots.push(
                new FormGroup({
                  'name': new FormControl(screenshot.name, Validators.required),
                  'slug': new FormControl(screenshot.slug, Validators.required),
                  'imgSource': new FormControl(screenshot.imgSource, Validators.required),
                  'tmbSource': new FormControl(screenshot.tmbSource)
                })
              );
            }
          }
          projectTags = project.tags;
        });
    }

    this.projectForm = new FormGroup({
      'name': new FormControl(projectName, Validators.required),
      'slug': new FormControl(projectSlug, [Validators.required, this.forbiddenProjectSlugNames.bind(this)]),
      'year': new FormControl(projectYear, Validators.required),
      'description': new FormControl(projectDescription, Validators.required),
      'descriptionStyling': new FormControl(projectDescriptionStyling),
      'database': new FormControl(projectDatabase),
      'frontEnd': new FormControl(projectFrontEnd),
      'backEnd': new FormControl(projectBackEnd),
      'webServer': new FormControl(projectWebServer),
      'paas': new FormControl(projectPaas),
      'versionControl': new FormControl(projectVersionControl),
      'buildTool': new FormControl(projectBuildTool),
      'styling': new FormControl(projectStyling),
      'databaseStyling': new FormControl(projectDatabaseStyling),
      'frontEndStyling': new FormControl(projectFrontEndStyling),
      'backEndStyling': new FormControl(projectBackEndStyling),
      'webServerStyling': new FormControl(projectWebServerStyling),
      'paasStyling': new FormControl(projectPaasStyling),
      'versionControlStyling': new FormControl(projectVersionControlStyling),
      'buildToolStyling': new FormControl(projectBuildToolStyling),
      'stylingStyling': new FormControl(projectStylingStyling),
      'screenshots': projectScreenshots,
      'tags': new FormControl(projectTags)
    });
  }

  // Does not allow multiple projects to have the same slug
  forbiddenProjectSlugNames(control: FormControl): {[s: string]: boolean} {
    if (!this.editMode) {
      if (this.forbiddenSlugs.indexOf(control.value) !== -1){
        return {'slugIsForbidden': true}
      }
    } return null;
  }

  getControls() {
    return (<FormArray>this.projectForm.get('screenshots')).controls;
  }

}
