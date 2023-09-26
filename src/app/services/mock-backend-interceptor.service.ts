import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MockBackendInterceptor implements HttpInterceptor {

    private randomNumber = Math.random();

    private readonly MOCK_SUCCESS_RESPONSE = of(
        new HttpResponse({
            status: 200,
            statusText: 'OK',
            body: null
        })
    ).pipe(delay(300));

    private readonly MOCK_ERROR_RESPONSE =
        new HttpErrorResponse({
            status: 503,
            statusText: 'ERREUR',
            error: { message: "service unavailable" }
        });

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.method === 'POST' && request.url.endsWith('/movment?type=in')) {
            this.randomNumber = Math.random();
            return this.randomNumber < 0.8 ? this.MOCK_SUCCESS_RESPONSE : throwError(this.MOCK_ERROR_RESPONSE);
        }
        else {
            return next.handle(request);
        }
    }
}
