import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_services/index';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const auth = this.injector.get(AuthenticationService);
        const authReq = req.clone({
            headers: req.headers.set('Authorization', auth.getToken())
        });
        return next.handle(authReq);
    }
}