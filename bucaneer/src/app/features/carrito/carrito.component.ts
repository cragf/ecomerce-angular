import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FormatearPrecioPipe } from '../../shared/pipes/formatear-precio-pipe';
import { CarritoService } from '../../core/services/carrito';
import { ItemCarrito } from '../../shared/models/producto.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormatearPrecioPipe
  ],
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

  formatearPrecio(valor: number): string {
    return 'RD$' + valor.toLocaleString('es-DO');
  }

  eliminar(id: number): void {
    this.carritoService.eliminar(id);
  }

  vaciar(): void {
    if (this.items.length === 0) {
      alert('El carrito ya está vacío');
      return;
    }
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
    const totalFormateado = this.formatearPrecio(this.total);
    alert(`✅ ¡Compra realizada exitosamente!\n\n📦 Número de orden: ${orden}\n💰 Total: ${totalFormateado}`);
    this.carritoService.vaciar();
  }
}