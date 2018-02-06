import { Photo } from '../../photos/photo.model';

export class Project {
  constructor(public name: string,
              public slug: string,
              public year: number,
              public screenshots: Photo[],
              public description: string,
              public database:string,
              public frontEnd:string,
              public backEnd: string,
              public webServer: string,
              public paas: string,
              public versionControl: string,
              public buildTool: string,
              public styling: string,
              public databaseStyling: boolean,
              public frontEndStyling:boolean,
              public backEndStyling: boolean,
              public webServerStyling: boolean,
              public paasStyling: boolean,
              public versionControlStyling: boolean,
              public buildToolStyling: boolean,
              public stylingStyling: boolean,
              public descriptionStyling: boolean,
              public tags: string[]) {}
}
