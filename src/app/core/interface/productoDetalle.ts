export interface DetalleProducto {
    id: string;
    ImagenP: string;
    carrusel: string[];
    Titulo: string;
    Descripcion: string;
    Precio: number;
    Favorito: boolean;
    cantidad?: number;
    categoria: number;
}
