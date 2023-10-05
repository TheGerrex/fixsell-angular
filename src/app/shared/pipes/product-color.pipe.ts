import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productColor'
})
export class ProductColorPipe implements PipeTransform {
  
  transform(value: boolean, trueClass: string, falseClass: string): string {
    return value ? trueClass : falseClass;
  }

}
