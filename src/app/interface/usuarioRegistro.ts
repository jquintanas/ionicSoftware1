export interface usuarioInterface {
    cedula?: String;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion?: string;
    contrasenia: string;
    createdAt?: Date;
    rol: number;
    updatedAt?: Date;
    hash?: string;
}