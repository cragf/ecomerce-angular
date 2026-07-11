import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BreadcrumbComponent
  ],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Contacto' }
  ];

  formData = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    terminos: false
  };

  mensajeEnviado = false;
  errorMensaje = '';

  onSubmit(): void {
    if (this.formData.nombre && this.formData.email && this.formData.telefono && this.formData.mensaje && this.formData.terminos) {
      this.mensajeEnviado = true;
      this.errorMensaje = '';
      console.log('Formulario enviado:', this.formData);
    } else {
      this.errorMensaje = 'Por favor completa todos los campos obligatorios.';
    }
  }
}