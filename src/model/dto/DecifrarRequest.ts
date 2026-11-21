export class DecifrarRequest {
    public textoCifrado: string;
    public deslocamento: number;

    constructor(textoCifrado: string, deslocamento: number) {
        this.textoCifrado = textoCifrado;
        this.deslocamento = deslocamento;
    }
}