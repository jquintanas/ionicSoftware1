export interface UpdateInterface {
    cedula?: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion?: string;
    contrasenia: string;
    rol: number;
    updatedAt?: Date;
    hash?: string;
}
