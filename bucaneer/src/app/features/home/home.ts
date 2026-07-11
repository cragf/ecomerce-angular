import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoCardComponent } from '../../shared/components/producto-card/producto-card.component';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito';
import { Producto } from '../../shared/models/producto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductoCardComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
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