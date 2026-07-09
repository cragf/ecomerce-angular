import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito.service';
import { Producto } from '../../shared/models/producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => this.productos = data.slice(0, 8)
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto, 1);
  }
}