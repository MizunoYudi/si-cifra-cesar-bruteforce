/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares } from '@tsoa/runtime';
import { ExpressTemplateService } from '@tsoa/runtime/express';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CifraCesarController } from './../controller/CifraCesarController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "CifrarRequest": {
        "dataType": "refObject",
        "properties": {
            "textoClaro": {"dataType":"string","required":true},
            "deslocamento": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CifrarResponse": {
        "dataType": "refObject",
        "properties": {
            "textoCifrado": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DecifrarRequest": {
        "dataType": "refObject",
        "properties": {
            "textoCifrado": {"dataType":"string","required":true},
            "deslocamento": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DecifrarResponse": {
        "dataType": "refObject",
        "properties": {
            "textoClaro": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsCifraCesarController_cifrar: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"CifrarRequest"},
                success: {"in":"res","name":"200","required":true,"ref":"CifrarResponse"},
                fail: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"erro":{"dataType":"string","required":true}}},
        };
        app.post('/cifrar',
            ...(fetchMiddlewares<RequestHandler>(CifraCesarController)),
            ...(fetchMiddlewares<RequestHandler>(CifraCesarController.prototype.cifrar)),

            async function CifraCesarController_cifrar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCifraCesarController_cifrar, request, response, next });

                const controller = new CifraCesarController();

              await templateService.apiHandler({
                methodName: 'cifrar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCifraCesarController_decifrar: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"DecifrarRequest"},
                success: {"in":"res","name":"200","required":true,"ref":"DecifrarResponse"},
                fail: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"erro":{"dataType":"string","required":true}}},
        };
        app.post('/decifrar',
            ...(fetchMiddlewares<RequestHandler>(CifraCesarController)),
            ...(fetchMiddlewares<RequestHandler>(CifraCesarController.prototype.decifrar)),

            async function CifraCesarController_decifrar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCifraCesarController_decifrar, request, response, next });

                const controller = new CifraCesarController();

              await templateService.apiHandler({
                methodName: 'decifrar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
