export interface UpdateInterface {
    cedula?: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    contrasenia: string;
    direccion?: string;
    createdAt?: Date;
    rol: number;
    updatedAt?: Date;
    hash?: string;
}
