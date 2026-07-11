import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [BreadcrumbComponent],  // ← Importar el componente que usa
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent {
  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Acerca de' }
  ];
}