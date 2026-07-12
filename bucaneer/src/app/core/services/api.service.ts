import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/models/producto.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  // ✅ Ruta CORRECTA para Angular
    private dataUrl = 'assets/data/productos.json';

    constructor(private http: HttpClient) { }

    obtenerProductos(): Observable<Producto[]> {
        console.log('Cargando productos desde:', this.dataUrl);
        return this.http.get<Producto[]>(this.dataUrl);
    }
}