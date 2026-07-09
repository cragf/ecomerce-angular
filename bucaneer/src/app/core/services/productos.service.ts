import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Producto } from '../../shared/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  public productos$ = this.productosSubject.asObservable();

  constructor(private api: ApiService) {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.api.obtenerProductos().subscribe({
      next: (data) => this.productosSubject.next(data),
      error: () => console.error('Error cargando productos')
    });
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.productos$;
  }

  obtenerProductoPorId(id: number): Observable<Producto | undefined> {
    return this.productos$.pipe(
      map(productos => productos.find(p => p.id === id))
    );
  }
}