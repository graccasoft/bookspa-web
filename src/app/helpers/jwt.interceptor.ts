import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccountsService} from "../service/accounts.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.includes("/api");
        const onlineBookingUrl = request.url.includes("/online-booking");
        if ((isLoggedIn && isApiUrl) && !onlineBookingUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}
