export interface IPedido {
    idPedido?: string;
    productos: string[];
    cantidades: number[];
    totalProductos: number;
    isDomicilio?: boolean;
    direccionDefault?: "S" | "N";
    direccionEntrega?: string;
    idUsuario: string;
    horaDeRetiro?: Date;
    cubiertos?: boolean;
    isEfectivo?: boolean;
    total: number;
}