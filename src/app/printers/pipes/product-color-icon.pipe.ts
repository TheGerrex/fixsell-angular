import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productColorIcon'
})
export class ProductColorIconPipe implements PipeTransform {

  transform(value: boolean, trueClass: string, falseClass: string): string {
    return value ? trueClass : falseClass;
  }

}
