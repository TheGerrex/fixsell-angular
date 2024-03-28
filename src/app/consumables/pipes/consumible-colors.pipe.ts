import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consumibleColors'
})
export class ConsumibleColorsPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'K':
        return 'Negro';
      case 'Y':
        return 'Amarillo';
      case 'M':
        return 'Magenta';
      case 'C':
        return 'Cyan';
      case 'MK':
        return 'Negro Matte';
      case 'BK':
        return 'Negro Gloss';
      case null:
        return "Sin color";
    }
    return value;
  }

}
