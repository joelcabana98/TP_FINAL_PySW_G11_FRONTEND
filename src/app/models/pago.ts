import { Afiliado } from './afiliado';

export class Pago {
    _id:string;
    fecha:Date;
    monto:number;
    anio:number;
    mes:number;
    afiliado:Afiliado;

    constructor(fecha?:Date, monto?:number, anio?:number, mes?:number, afiliado?:Afiliado){
        this.fecha = fecha;
        this.monto = monto;
        this.anio = anio;
        this.mes = mes;
        this.afiliado = afiliado;
    }
}