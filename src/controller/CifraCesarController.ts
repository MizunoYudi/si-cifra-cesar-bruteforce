import { Body, Get, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CifrarRequest } from "../model/dto/CifrarRequest";
import { CifrarResponse } from "../model/dto/CifrarResponse";
import { CifraCesarService } from "../service/CifraCesarService";
import { DecifrarRequest } from "../model/dto/DecifrarRequest";
import { DecifrarResponse } from "../model/dto/DecifrarResponse";

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
}