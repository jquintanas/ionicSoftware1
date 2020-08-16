export interface IPedido {
    idPedido?: string;
    productos: string[];
    cantidades: number[];
    totalProductos: number;
    isDomicilio?: boolean;
    direccionEntrega?: string;
    idUsuario: string;
    horaDeRetiro?: Date;
    cubiertos?: boolean;
    isEfectivo?: boolean;
    total: number;
    estadoDelPedido: 0;
}