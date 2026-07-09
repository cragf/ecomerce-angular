import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductosComponent } from './features/productos/productos.component';
import { ProductoDetalleComponent } from './features/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { AcercaComponent } from './features/acerca/acerca.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'producto/:id', component: ProductoDetalleComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }