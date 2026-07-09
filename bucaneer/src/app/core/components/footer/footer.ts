import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  emailNewsletter = '';

  suscribirse(event: Event): void {
    event.preventDefault();
    if (this.emailNewsletter) {
      alert(`✅ ¡Te has suscrito con el correo: ${this.emailNewsletter}!`);
      this.emailNewsletter = '';
    }
  }
}