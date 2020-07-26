export interface Novedad {
    idnovedad?: number;
    idusuarioReporta: string;
    idusuarioReportado: string;
    descripcion: string;
    createdAt?: Date;
    updatedAt?: Date;
}