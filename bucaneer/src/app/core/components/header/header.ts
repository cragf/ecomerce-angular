import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';  // ← Para routerLink
import { FormsModule } from '@angular/forms';  // ← Para ngModel
import { AsyncPipe } from '@angular/common';  // ← Para async pipe
import { Observable } from 'rxjs';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe  // ← Para el pipe async
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
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