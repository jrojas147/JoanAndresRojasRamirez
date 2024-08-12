import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '@components/toast/toast.service';
import { ToastType } from '@components/toast/toast.model';

@Injectable()
export class MainHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastService: ToastService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
        }
      }),
      catchError((err) => {
        if (err.status === 403) {
          this.toastService.show('Exitoso', 'Ocurrio un error tipo 403' || '', 0, ToastType.Error);
          this.router.navigate(['/']);
        } else if (err.status === 401) {
          this.toastService.show('Exitoso', 'Ocurrio un error tipo 401' || '', 0, ToastType.Error);
          this.router.navigate(['/']);
        }

        const error = err.error || err.statusText;

        return throwError(error);
      }),
      map((event) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    return throwError(error);
  }
}
