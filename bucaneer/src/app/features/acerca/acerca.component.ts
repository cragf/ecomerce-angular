import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent {
  breadcrumbItems = [
    { label: 'Inicio', url: '/' },
    { label: 'Blog y noticias' }
  ];
}