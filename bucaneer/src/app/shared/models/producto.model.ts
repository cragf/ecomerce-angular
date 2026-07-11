export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precio_anterior?: number;
  oferta?: string;
  categoria: string;
  marca: string;
  sku: string;
  stock: number;
  rating: number;
  resenas: number;
  imagen: string;
  miniaturas?: { src: string; alt: string }[];
  descripcion: string;
  especificaciones: { caracteristica: string; valor: string }[];
  beneficios?: string[];
  video?: { mp4: string; webm: string; poster: string; caption: string };
  audio?: { mp3: string; ogg: string; caption: string };
  blockquote?: { texto: string; cita: string; cite?: string };
  resenas_lista?: { nombre: string; estrellas: number; fecha: string; comentario: string }[];
  relacionados?: { id: number; nombre: string; precio: number; imagen: string }[];
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}