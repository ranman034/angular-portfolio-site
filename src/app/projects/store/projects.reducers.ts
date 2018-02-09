import * as ProjectsActions from './projects.actions';

import { Photo } from '../../photos/photo.model';
import { Project } from '../project/project.model';

export interface State {
  projects: Project[];
  currentProjects?: Project[];
  editedProject: Project;
  editedProjectSlug: string;
  tags: string[];
  tagsSelected: string[];
}

const initialState: State = {
  projects: [
    new Project(
      "vccicc",
      "vccicc",
      2016,
      [
        new Photo("Screenshot 1","vcciccscreenshot1","http://www.tylerraney.com/resources/img/vccicc/screenshot1.jpg","")
      ],
      "test description vccicc sdfgsdfkjsdgfsdgfjksd. safgsdfgsd sfsdf sdfsd sdfs dfs sdf sfsdffsf. sdfsdfsdfdfs sdfsdfsd . <a href=\"http:\/\/www.facebook.com\">angular</> sdfsdfsd sdfs. sdfsd.fsd.fs ",
      "MySql",
      "Django",
      "Django",
      "",
      "",
      "Git",
      "",
      "bootstrap, html, css, <a href=\"http:\/\/www.facebook.com\">angular</>",
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      [
        "Python"
      ]
    ),
    new Project(
      "tylerraney.com",
      "tylerraney",
      2017,
      [
        new Photo("Screenshot 1","tyscreenshot1","http://www.tylerraney.com/resources/img/vccicc/screenshot1.jpg","")
      ],
      "test description tylerraney sdfgsdfkjsdgfsdgfjksd. safgsdfgsd sfsdf sdfsd sdfs dfs sdf sfsdffsf. sdfsdfsdfdfs sdfsdfsd .  <a href=\"http:\/\/www.facebook.com\">angular<\/a> sdfsdfsd sdfs. sdfsd.fsd.fs ",
      "MySql",
      "<b>Angular</b>",
      "",
      "",
      "",
      "Git",
      "",
      "bootstrap, html, css, <a href=\"http:\/\/www.facebook.com\">angular</>",
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      [
        "Angular"
      ]
    )
  ],
  tags: ["Angular", "Python"].sort(),
  tagsSelected: [],
  editedProject: null,
  editedProjectSlug: null
}

export function projectsReducer(state = initialState, action: ProjectsActions.ProjectsActions) {
  switch(action.type) {
      case ProjectsActions.SET_PROJECTS:
      let setTags = [];
      action.payload.forEach((project, index) => {
        project.tags.forEach((currTag, index) => {
          if (!setTags.includes(currTag)){
            setTags.push(currTag);
          }
        });
      })
      return {
        ...state,
      projects: [...action.payload],
      tags: setTags.sort()
    };
    case ProjectsActions.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case ProjectsActions.UPDATE_PROJECT:
      let project = null;
      let currIndex = 0;
      state.projects.forEach((currProject, index) => {
        if (currProject.slug === action.payload.slug){
          project = currProject;
          currIndex = index;
        }
      });
      const updateProject = {
        ...project,
        ...action.payload.updatedProject
      };
      const projects = [...state.projects];
      projects[currIndex] = updateProject;
      return {
        ...state,
        projects: projects,
        editedProject: null,
        editedProjectSlug: null
      };
    case ProjectsActions.UPDATE_TAGS:
      let projectsToCheck = [...state.projects];
      let updatedTags = [];
      projectsToCheck.forEach((project, index) => {
        project.tags.forEach((currTag, index) => {
          if (!updatedTags.includes(currTag)){
            updatedTags.push(currTag);
          }
        });
      })
      return {
        ...state,
        tags: updatedTags.sort()
      };
    case ProjectsActions.DELETE_PROJECT:
      const newProjects = [...state.projects];
      let delIndex = 0;
      newProjects.forEach((project, currIndex) => {
        if (project.slug == action.payload) {
          delIndex = currIndex;
        }
      })
      newProjects.splice(delIndex,1);
      return {
        ...state,
        projects: newProjects,
      };
    case ProjectsActions.FETCH_PROJECTS_BY_TAGS:
      const allProjects = [...state.projects];
      const tags = action.payload;
      const projectsByTag = [];
      let selectedTagIndex = 0;
      let allTags = true;
      for (let project of allProjects){
        while(allTags && selectedTagIndex < tags.length) {
          if (project.tags.indexOf(tags[selectedTagIndex])===-1) {
            allTags = false;
          }
          selectedTagIndex++;
        }
        if (allTags) {
          projectsByTag.push(project);
        }
        selectedTagIndex = 0;
        allTags = true;
      }
      return {
        ...state,
        currentProjects: projectsByTag,
        tagsSelected: state.tagsSelected
      }
    default:
      return state;
  }
}
