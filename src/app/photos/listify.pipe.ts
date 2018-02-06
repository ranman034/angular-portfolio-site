import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listify',
  pure: false
})
export class ListifyPipe implements PipeTransform {

  transform(value: any): any {
    let lenValue = value.length;
    const resultArray = [];
    if (lenValue === 0){
      return value;
    }
    let index = 0;
    for (let item of value) {
        index++;
        if (index == lenValue){
          resultArray.push("and " + item + ".");
        } else {
          if (lenValue==2){
            resultArray.push(item + " ");
          } else {
            resultArray.push(item + ", ");
          }
        }
    }
    return resultArray;
  }

}
