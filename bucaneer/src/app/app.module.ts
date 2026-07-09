import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { TopbarComponent } from './core/components/topbar/topbar.component';
import { HomeComponent } from './features/home/home.component';
import { ProductosComponent } from './features/productos/productos.component';
import { ProductoDetalleComponent } from './features/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { AcercaComponent } from './features/acerca/acerca.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProductoCardComponent } from './shared/components/producto-card/producto-card.component';
import { GaleriaImagenesComponent } from './shared/components/galeria-imagenes/galeria-imagenes.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { FormatearPrecioPipe } from './shared/pipes/formatear-precio.pipe';
import { GenerarEstrellasPipe } from './shared/pipes/generar-estrellas.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopbarComponent,
    HomeComponent,
    ProductosComponent,
    ProductoDetalleComponent,
    CarritoComponent,
    ContactoComponent,
    AcercaComponent,
    NotFoundComponent,
    ProductoCardComponent,
    GaleriaImagenesComponent,
    BreadcrumbComponent,
    FormatearPrecioPipe,
    GenerarEstrellasPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }