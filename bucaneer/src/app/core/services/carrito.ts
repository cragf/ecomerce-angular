import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto, ItemCarrito } from '../../shared/models/producto.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: ItemCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  private contadorSubject = new BehaviorSubject<number>(0);

  public carrito$ = this.carritoSubject.asObservable();
  public contadorItems$ = this.contadorSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.cargarDesdeLocalStorage();
  }

  agregar(producto: Producto, cantidad: number = 1): void {
    const existente = this.items.find(item => item.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push({ ...producto, cantidad });
    }
    this.guardar();
  }

  eliminar(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.guardar();
  }

  vaciar(): void {
    this.items = [];
    this.guardar();
  }

  calcularTotal(): number {
    return this.items.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
  }

  contarItems(): number {
    return this.items.reduce((suma, item) => suma + item.cantidad, 0);
  }

  private guardar(): void {
    if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('carrito', JSON.stringify(this.items));
        this.carritoSubject.next([...this.items]);
        this.contadorSubject.next(this.contarItems());
    }
  }

  private cargarDesdeLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('carrito');
      if (data) {
        this.items = JSON.parse(data);
        this.carritoSubject.next([...this.items]);
        this.contadorSubject.next(this.contarItems());
      }
    }
  }
} 