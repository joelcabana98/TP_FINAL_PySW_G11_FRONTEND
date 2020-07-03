export class Usuario {
    _id: string;
    usuario: string;
    password: string;
    activo: boolean;
    perfil: string;

    constructor(usuario?: string, password?: string, activo?: boolean,perfil?: string){
        this.usuario = usuario;
        this.password = password;
        this.activo = activo;
        this.perfil = perfil;
    }
}
