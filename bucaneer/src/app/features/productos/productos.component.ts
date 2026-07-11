import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ProductoCardComponent } from '../../shared/components/producto-card/producto-card.component';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito';
import { Producto } from '../../shared/models/producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    BreadcrumbComponent,
    ProductoCardComponent
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  terminoBusqueda = '';

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
      }
    });
  }

  filtrarProductos(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.productosFiltrados = this.productos;
      return;
    }
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(termino) ||
      p.descripcion.toLowerCase().includes(termino)
    );
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto, 1);
  }

  onBuscar(event: Event): void {
    event.preventDefault();
    this.filtrarProductos();
  }
}