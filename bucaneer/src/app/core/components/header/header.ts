import { Component, OnInit } from '@angular/core';
export class Header {}
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class HeaderComponent implements OnInit {
  contadorCarrito$!: Observable<number>;
  terminoBusqueda = '';

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.contadorCarrito$ = this.carritoService.contadorItems$;
  }

  buscar(event: Event): void {
    event.preventDefault();
    if (this.terminoBusqueda.trim()) {
      this.router.navigate(['/productos'], { queryParams: { q: this.terminoBusqueda } });
    }
  }
}