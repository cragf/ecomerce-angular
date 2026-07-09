import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../core/services/carrito.service';
import { ItemCarrito } from '../../shared/models/producto.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: ItemCarrito[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe({
      next: (data) => {
        this.items = data;
        this.total = this.carritoService.calcularTotal();
      }
    });
  }

  eliminar(id: number): void {
    this.carritoService.eliminar(id);
  }

  vaciar(): void {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.carritoService.vaciar();
    }
  }

  procederPago(): void {
    if (this.items.length === 0) {
      alert('❌ Tu carrito está vacío');
      return;
    }
    const orden = 'ORD-' + Math.floor(Math.random() * 9000 + 1000);
    alert(`✅ ¡Compra realizada exitosamente!\n📦 Número de orden: ${orden}\n💰 Total: ${this.total | formatearPrecio}`);
    this.carritoService.vaciar();
  }
}