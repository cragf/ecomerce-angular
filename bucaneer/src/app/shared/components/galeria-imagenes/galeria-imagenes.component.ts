import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-galeria-imagenes',
  standalone: true,
  imports: [],
  templateUrl: './galeria-imagenes.component.html',
  styleUrls: ['./galeria-imagenes.component.css']
})
export class GaleriaImagenesComponent implements OnInit {
  @Input() miniaturas: { src: string; alt: string }[] = [];
  @Input() imagenPrincipal: string = '';
  @Input() titulo: string = 'Producto';

  imagenActual: string = '';
  captionActual: string = '';

  ngOnInit(): void {
    this.imagenActual = this.imagenPrincipal || this.miniaturas?.[0]?.src || '';
    this.captionActual = this.titulo;
  }

  cambiarImagen(src: string, alt: string): void {
    this.imagenActual = src;
    this.captionActual = alt || this.titulo;
  }
}