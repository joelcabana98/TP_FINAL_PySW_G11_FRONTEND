import { Afiliado } from './afiliado';

export class Servicio {
    _id: string;
    nombre: string;
    imagen: string;
    activo: boolean;
    descripcion: string;
    afiliadosInsc: Array<Afiliado>;

    constructor(id?: string, nombre?: string, imagen?: string, activo?: boolean, descripcion?: string){
        this._id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.activo = activo;
        this.descripcion = descripcion;
        this.afiliadosInsc = new Array<Afiliado>();
    }    
}
