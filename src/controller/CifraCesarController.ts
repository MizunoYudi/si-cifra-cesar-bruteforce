import { Body, Get, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CifrarRequest } from "../model/dto/CifrarRequest";
import { CifrarResponse } from "../model/dto/CifrarResponse";
import { CifraCesarService } from "../service/CifraCesarService";
import { DecifrarRequest } from "../model/dto/DecifrarRequest";
import { DecifrarResponse } from "../model/dto/DecifrarResponse";
import { DecifrarForcaBrutaRequest } from "../model/dto/DecifrarForcaBrutaRequest";
import { DecifrarForcaBrutaResponse } from "../model/dto/DecifrarForcaBrutaResponse";

@Route("")
@Tags("default")

export class CifraCesarController {
    private cifraCesarService = new CifraCesarService();

    @Post("/cifrar")
    async cifrar(
        @Body() dto: CifrarRequest,
        @Res() success: TsoaResponse<200, CifrarResponse>,
        @Res() fail: TsoaResponse<400, { erro: string }>
    ) {
        try {
            const cifraResponse = this.cifraCesarService.cifrar(dto);
            return success(200, cifraResponse);
        } catch (error: any) {
            return fail(400, { erro: error.message });
        }
    }

    @Post("/decifrar")
    async decifrar(
        @Body() dto: DecifrarRequest,
        @Res() success: TsoaResponse<200, DecifrarResponse>,
        @Res() fail: TsoaResponse<400, { erro: string }>
    ) {
        try {
            const decifrarResponse = this.cifraCesarService.decifrar(dto);
            return success(200, decifrarResponse);
        } catch (error: any) {
            return fail(400, { erro: error.message });
        }
    }
    
    @Post("/decifrarForcaBruta")
    async decifrarForcaBruta(
        @Body() dto: DecifrarForcaBrutaRequest,
        @Res() success: TsoaResponse<200, DecifrarForcaBrutaResponse>,
        @Res() fail: TsoaResponse<400, { erro: string }>
    ) {
        try {
            const decifrarForcaBrutaResponse = this.cifraCesarService.decifrarForcaBruta(dto);
            return success(200, decifrarForcaBrutaResponse);
        } catch (error: any) {
            console.log(error);
            return fail(400, { erro: error.message });
        }
    }
}