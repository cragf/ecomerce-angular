import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FormatearPrecioPipe } from '../../shared/pipes/formatear-precio-pipe';
import { CarritoService } from '../../core/services/carrito';
import { ItemCarrito } from '../../shared/models/producto.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
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

    // 1. Generar número de orden
    const orden = 'ORD-' + String(Math.floor(Math.random() * 9000 + 1000)).padStart(4, '0');
    const totalFormateado = this.formatearPrecio(this.total);

    // 2. Calcular fecha de entrega (hoy + 5 días)
    const fechaEntrega = new Date();
    fechaEntrega.setDate(fechaEntrega.getDate() + 5);
    const fechaFormateada = fechaEntrega.toLocaleDateString('es-DO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // 3. Simular envío de email
    this.simularEnvioEmail(orden, totalFormateado, fechaFormateada);

    // 4. Mostrar mensaje de confirmación
    alert(
        `✅ ¡Compra realizada exitosamente!\n\n` +
        `📦 Número de orden: ${orden}\n` +
        `💰 Total pagado: ${totalFormateado}\n\n` +
        `📧 Te hemos enviado un correo con el recibo a tu dirección.\n` +
        `📅 Fecha estimada de entrega: ${fechaFormateada}\n\n` +
        `¡Gracias por confiar en Bucaneer! 🏴‍☠️`
    );

    // 5. Vaciar carrito
    this.carritoService.vaciar();
    }
    simularEnvioEmail(orden: string, total: string, fecha: string): void {
        console.log(`%c📧 Enviando correo electrónico...`, 'font-size: 16px; font-weight: bold; color: #066847;');
        console.log(`%c   ─────────────────────────────`, 'color: #666;');
        console.log(`   📦 Orden: ${orden}`);
        console.log(`   💰 Total: ${total}`);
        console.log(`   📅 Entrega estimada: ${fecha}`);
        console.log(`   📧 Para: cliente@correo.com`);
        console.log(`   📎 Adjunto: recibo-${orden}.pdf (simulado)`);
        console.log(`%c   ─────────────────────────────`, 'color: #666;');
        console.log(`%c✅ Email enviado correctamente.`, 'font-size: 14px; font-weight: bold; color: #4ADE80;');
    }
}