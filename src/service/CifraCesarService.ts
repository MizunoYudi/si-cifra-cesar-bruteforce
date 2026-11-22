import { BRISPELL, PYTHONPROBR, Word } from "@andsfonseca/palavras-pt-br";
import { CifrarRequest } from "../model/dto/CifrarRequest";
import { CifrarResponse } from "../model/dto/CifrarResponse";
import { DecifrarForcaBrutaRequest } from "../model/dto/DecifrarForcaBrutaRequest";
import { DecifrarForcaBrutaResponse } from "../model/dto/DecifrarForcaBrutaResponse";
import { DecifrarRequest } from "../model/dto/DecifrarRequest";
import { DecifrarResponse } from "../model/dto/DecifrarResponse";import { ProximidadeTextoCifrado } from "../model/entity/ProximidadeTextoCifrado";
;

export class CifraCesarService {
    public cifrar(data: CifrarRequest): CifrarResponse {
        if (!data.textoClaro)
            throw new Error('Entrada invalida: Texto claro esta vazio');
        if (!data.deslocamento)
            throw new Error('Entrada invalida: Fator de deslocamento não preenchido!');
        else if (data.deslocamento < 0)
            throw new Error('Entrada invalida: Fator de deslocamento deve ser maior que zero!');
        const textoCifrado = this.aplicarCifraCesar(data.textoClaro, data.deslocamento);
        return new CifrarResponse(textoCifrado);
    }

    public decifrar(data: DecifrarRequest): DecifrarResponse {
        if (!data.textoCifrado)
            throw new Error('Entrada invalida: Texto cifrado esta vazio');
        if (!data.deslocamento)
            throw new Error('Entrada invalida: Fator de deslocamento não preenchido!');
        else if (data.deslocamento < 0)
            throw new Error('Entrada invalida: Fator de deslocamento deve ser maior que zero!');
        const textoCifrado = this.aplicarCifraCesar(data.textoCifrado, -data.deslocamento);
        return new DecifrarResponse(textoCifrado);
    }

    public decifrarForcaBruta(data: DecifrarForcaBrutaRequest): DecifrarForcaBrutaResponse {
        if (!data.textoCifrado)
            throw new Error('Entrada invalida: Texto cifrado esta vazio');
        const textoDecifrado = this.aplicarCifraCesarForcaBruta(data.textoCifrado);
        return new DecifrarForcaBrutaResponse(textoDecifrado);
    }

    private aplicarCifraCesar(textoClaro: string, deslocamento: number): string {
        this.verificarMensagemValida(textoClaro);
        const textoClaroArray = textoClaro.split("");
        return textoClaroArray.map((char: string) => this.deslocar(char, deslocamento)).join("");
    }

    private verificarMensagemValida(textoClaro: string): void {
        const arrayTextoClaro = textoClaro.split("");
        for (let char = 0; char < arrayTextoClaro.length; char++) {
            if (arrayTextoClaro[char].charCodeAt(0) == 32)
                continue;
            if (arrayTextoClaro[char].charCodeAt(0) >= 65 && arrayTextoClaro[char].charCodeAt(0) <= 90) {
                continue;
            }
            if (arrayTextoClaro[char].charCodeAt(0) >= 97 && arrayTextoClaro[char].charCodeAt(0) <= 122) {
                continue;
            }
            throw new Error("Mensagem invalida: texto claro deve ser composto apenas letras (sem acento)")
        }
    }

    private deslocar(caracter: string, deslocamento: number): string {
        const valorUnicode = caracter.charCodeAt(0);
        let base: number;
        if (valorUnicode == 32)
            return caracter;
        if (valorUnicode >= 65 && valorUnicode <= 90)
            base = 65;
        else
            base = 97;
        const posicao = valorUnicode - base;
        const novaPosicao = (((posicao + deslocamento) % 26) + 26) % 26;
        return String.fromCharCode(base + novaPosicao);
    }

    private aplicarCifraCesarForcaBruta(textoClaro: string): string {
        this.verificarMensagemValida(textoClaro);
        const todasPossibilidadesCifra = this.obterTodasPossibilidadesCifraCesar(textoClaro);
        return this.obterPossibilidadeMaisProxima(todasPossibilidadesCifra);
    }

    private obterTodasPossibilidadesCifraCesar(textoClaro: string): string[] {
        const todasPossibilidades = [];
        for (let i = 1; i < 26; i++)
            todasPossibilidades.push(this.aplicarCifraCesar(textoClaro, i));
        return todasPossibilidades;
    }

    private obterPossibilidadeMaisProxima(textosCifrados: string[]): string {
        const proximidades: ProximidadeTextoCifrado[] = [];
        for (let i = 0; i < 25; i++)
            proximidades.push(new ProximidadeTextoCifrado(
                i,
                this.avaliarProximidade(textosCifrados[i]),
                textosCifrados[i])
            );
        return this.proximidadeMaior(proximidades);
    }

    private avaliarProximidade(textoCifrado: string): number {
        Word.library = BRISPELL;
        const palavrasTextoCifrado: string[] = textoCifrado.split(" ");
        const palavrasProximas: string[] = [];
        for (let i of palavrasTextoCifrado){
            if (Word.checkValid(i.toLocaleLowerCase(), 0, true))
                palavrasProximas.push(i);
        }
        return palavrasProximas.length;
    }

    private proximidadeMaior(proximidades: ProximidadeTextoCifrado[]): string {
        let proximidadeMaior: ProximidadeTextoCifrado = proximidades[0];
        for (let i of proximidades)
            if (i.pontuacao > proximidadeMaior.pontuacao)
                proximidadeMaior = i;
        if(!(proximidadeMaior.pontuacao > 0))
            throw new Error("Nao foi possivel encontrar nenhuma mensagem clara em Portugues Brasileiro")
        return proximidadeMaior.texto;
    }
}