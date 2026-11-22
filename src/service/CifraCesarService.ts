import { CifrarRequest } from "../model/dto/CifrarRequest";
import { CifrarResponse } from "../model/dto/CifrarResponse";
import { DecifrarRequest } from "../model/dto/DecifrarRequest";
import { DecifrarResponse } from "../model/dto/DecifrarResponse";

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
        const valorUnicode = caracter.charCodeAt(0)
        if (valorUnicode == 32)
            return String.fromCharCode(valorUnicode);
        if (valorUnicode >= 65 && valorUnicode <= 90) {
            if ((valorUnicode + deslocamento % 26) > 90)
                return String.fromCharCode(65 + (90 - valorUnicode) + deslocamento % 26 - 1);
        }
        if (valorUnicode >= 90 && valorUnicode <= 122) {
            if ((valorUnicode + deslocamento % 26) > 122)
                return String.fromCharCode(97 + (122 - valorUnicode) + deslocamento % 26 - 1);
        }
        return String.fromCharCode(valorUnicode + deslocamento % 26);
    }
}