import { Usuario } from './usuario';

export class Novedad {
    _id: string;
    usuario: Usuario;
    texto: string;
    estado: string;

    constructor(id?: string, usuario?: Usuario, texto?: string, estado?: string){
       this._id = id;
       this.usuario = usuario;
       this.texto = texto;
       this.estado = estado; 
    }
}
