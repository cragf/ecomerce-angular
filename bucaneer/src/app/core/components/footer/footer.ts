import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
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