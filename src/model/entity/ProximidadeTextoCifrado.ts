export class ProximidadeTextoCifrado {
    public deslocado: number;
    public pontuacao: number;
    public texto: string;

    constructor(deslocado: number, pontuacao: number, texto: string) {
        this.deslocado = deslocado;
        this.pontuacao = pontuacao;
        this.texto = texto;
    }
}