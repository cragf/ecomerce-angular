import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito.service';
import { Producto } from '../../shared/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  terminoBusqueda = '';

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.aplicarFiltroDesdeURL();
      }
    });
  }

  aplicarFiltroDesdeURL(): void {
    this.route.queryParams.subscribe(params => {
      this.terminoBusqueda = params['q'] || '';
      if (this.terminoBusqueda) {
        this.filtrarProductos();
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