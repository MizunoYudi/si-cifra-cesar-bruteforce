export class CifrarRequest {
    public textoClaro: string;
    public deslocamento: number;

    constructor(textoClaro: string, deslocamento: number) {
        this.textoClaro = textoClaro;
        this.deslocamento = deslocamento;
    }
}