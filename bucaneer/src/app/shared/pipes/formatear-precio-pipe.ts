import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearPrecio'
})
export class FormatearPrecioPipe implements PipeTransform {
  transform(valor: number): string {
    return 'RD$' + valor.toLocaleString('es-DO');
  }
}