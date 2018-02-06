export class Photo {
  constructor(public name: string,
              public slug: string,
              public imgSource: string,
              public tmbSource: string,
              public tags?: string[]) {}
}
