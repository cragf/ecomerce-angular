import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormatearPrecioPipe } from '../../pipes/formatear-precio-pipe';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormatearPrecioPipe
  ],
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
  @Output() agregarCarrito = new EventEmitter<Producto>();

  get estrellas(): string {
    const llenas = Math.floor(this.producto.rating || 0);
    return '⭐'.repeat(llenas) + '☆'.repeat(5 - llenas);
  }

  onAgregarCarrito(): void {
    this.agregarCarrito.emit(this.producto);
  }
}