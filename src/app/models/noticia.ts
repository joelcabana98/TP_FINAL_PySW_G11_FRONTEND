import { Usuario } from './usuario';

export class Noticia {
    
    _id:string;
    titulo:string;
    descripcion:string;
    fecha:Date;
    vigente:boolean;
    imagen:string;
    usuario:Usuario;

    constructor(titulo?:string,descripcion?:string,fecha?:Date,vigente?:boolean,imagen?:string){
        this.titulo = titulo;
        this.descripcion =descripcion;
        this.fecha = fecha;
        this.vigente = vigente;
        this.imagen = imagen;
        this.usuario = new Usuario();
    }
}
