import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MockBackendInterceptor implements HttpInterceptor {

    private randomNumber = Math.random();

    private readonly MOCK_GET_LAST_MOVEMENT = [
        {
            isTypeOut: true,
            technicalId: 123,
            creationDateTime: new Date(),
            creationUserName: "William",
            dateTime: new Date(),
            declarationLocation: "Bordeaux",
            warehouseOriginCode: "NV1",
            warehouseDestCode: "SL2",
            customsStatus: "X",
            merchandise: {
                reference: {
                    type: "AWB",
                    value: 7712345678
                },
                quantity: 2,
                weight: 5,
                totalQuantity: 6,
                totalWeight: 8,
                description: "Description de la marchandise"
            }
        },
        {
            isTypeOut: false,
            technicalId: 123,
            creationDateTime: new Date(),
            creationUserName: "John",
            dateTime: new Date(),
            declarationLocation: "Bordeaux",
            warehouseOriginCode: "SL2",
            warehouseDestCode: "NV1",
            customsStatus: "C",
            merchandise: {
                reference: {
                    type: "AWB",
                    value: 7712345679
                },
                quantity: 9,
                weight: 21,
                totalQuantity: 40,
                totalWeight: 55,
                description: "Description de l'autre marchandise"
            }
        }
    ];

    private readonly MOCK_GET_SUCCESS_RESPONSE = of(
        new HttpResponse({
            status: 200,
            statusText: 'OK',
            body: this.MOCK_GET_LAST_MOVEMENT
        })
    ).pipe(delay(500));

    private readonly MOCK_GET_ERROR_RESPONSE = of(
        new HttpErrorResponse({
            status: 503,
            statusText: 'ERREUR',
            error: { message: "service unavailable" }
        })
    ).pipe(delay(500));

    private readonly MOCK_POST_SUCCESS_RESPONSE = of(
        new HttpResponse({
            status: 200,
            statusText: 'OK',
            body: null
        })
    ).pipe(delay(300));

    private readonly MOCK_POST_ERROR_RESPONSE = of(
        new HttpErrorResponse({
            status: 503,
            statusText: 'ERREUR',
            error: { message: "service unavailable" }
        })
    ).pipe(delay(300));

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.randomNumber = Math.random();
        if (request.method === 'POST' && (request.url.endsWith('/movement?type=in') || request.url.endsWith('/movement?type=out'))) {
            return this.randomNumber < 0.8 ? this.MOCK_POST_SUCCESS_RESPONSE : throwError(this.MOCK_POST_ERROR_RESPONSE);
        } else if (request.method === 'GET' && request.url.endsWith('/movements/latest')) {
            return this.randomNumber < 0.8 ? this.MOCK_GET_SUCCESS_RESPONSE : throwError(this.MOCK_GET_ERROR_RESPONSE);
        } else {
            return next.handle(request);
        }
    }
}
