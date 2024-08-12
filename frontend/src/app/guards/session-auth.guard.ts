import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '@components/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class SessionAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastService: ToastService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('token')) {
      return true;
    }

    this.toastService.show('Error', 'Debe contar con una variable sesion Token' || '');
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});

    return false;
  }
}
