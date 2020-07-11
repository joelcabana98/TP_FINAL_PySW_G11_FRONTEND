import { Usuario } from './usuario';

export class Novedad {
    _id: string;
    usuario: Usuario;
    fecha: Date;
    texto: string;
    estado: string;

    constructor(id?: string, usuario?: Usuario, fecha?: Date, texto?: string, estado?: string){
       this._id = id;
       this.usuario = usuario;
       this.fecha = fecha;
       this.texto = texto;
       this.estado = estado; 
    }
}
