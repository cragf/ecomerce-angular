import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generarEstrellas'
})
export class GenerarEstrellasPipe implements PipeTransform {
  transform(cantidad: number): string {
    return '⭐'.repeat(cantidad) + '☆'.repeat(5 - cantidad);
  }
}