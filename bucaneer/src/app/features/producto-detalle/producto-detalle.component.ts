import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { GaleriaImagenesComponent } from '../../shared/components/galeria-imagenes/galeria-imagenes.component';
import { FormatearPrecioPipe } from '../../shared/pipes/formatear-precio-pipe';
import { GenerarEstrellasPipe } from '../../shared/pipes/generar-estrellas.pipe';
import { ProductosService } from '../../core/services/productos.service';
import { CarritoService } from '../../core/services/carrito';
import { Producto } from '../../shared/models/producto.model';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BreadcrumbComponent,
    GaleriaImagenesComponent,
    FormatearPrecioPipe,
    GenerarEstrellasPipe
  ],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto?: Producto;
  cantidad: number = 1;
  breadcrumbItems: { label: string; url?: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.obtenerProductoPorId(id).subscribe({
      next: (data) => {
        if (data) {
          this.producto = data;
          this.breadcrumbItems = [
            { label: 'Inicio', url: '/' },
            { label: 'Productos', url: '/productos' },
            { label: data.categoria || 'Categoría', url: '/productos' },
            { label: data.nombre }
          ];
        } else {
          this.router.navigate(['/404']);
        }
      },
      error: () => this.router.navigate(['/404'])
    });
  }

  get estrellas(): string {
    if (!this.producto) return '';
    const llenas = Math.floor(this.producto.rating || 0);
    return '⭐'.repeat(llenas) + '☆'.repeat(5 - llenas);
  }

  agregarAlCarrito(): void {
    if (this.producto) {
      this.carritoService.agregar(this.producto, this.cantidad);
    }
  }
}