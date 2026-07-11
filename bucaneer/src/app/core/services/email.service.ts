import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'TU_SERVICE_ID';    // De EmailJS
  private templateId = 'TU_TEMPLATE_ID';  // De EmailJS
  private publicKey = 'TU_PUBLIC_KEY';    // De EmailJS

  constructor() {
    emailjs.init(this.publicKey);
  }

  enviarEmailCompra(datos: {
    nombre: string;
    email: string;
    orden: string;
    total: string;
    productos: string;
  }): Promise<any> {
    const templateParams = {
      to_name: datos.nombre,
      to_email: datos.email,
      order_number: datos.orden,
      total: datos.total,
      products: datos.productos,
      date: new Date().toLocaleDateString('es-DO')
    };

    return emailjs.send(this.serviceId, this.templateId, templateParams);
  }
}