import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildRoute, ServicesRoutes } from '../../utils/services-routes';
import { ServiceUtils } from '../services-utils/services-utils';
import { AccountsListModel, AccountsModel } from '../../models/accounts.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private serviceUtils: ServiceUtils) {}

  public getAccounts(): Observable<any> | null {
    return this.serviceUtils.buildRequest(ServicesRoutes.getAccounts, 'get');
  }

  public getAccountsById(idAccount: string): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      buildRoute(ServicesRoutes.getAccountsById, { idAccount: idAccount }),
      'get'
    );
  }

  public postAccounts(data: AccountsModel): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      ServicesRoutes.postAccounts,
      'post',
      data
    );
  }

  public putAccounts(data: AccountsModel): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      buildRoute(ServicesRoutes.putAccounts, { idAccount: data.id }),
      'put',
      data
    );
  }

  public deleteAccounts(data: AccountsModel): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      buildRoute(ServicesRoutes.deleteAccounts, { idAccount: data.id }),
      'delete'
    );
  }

  public verifyAccount(idAccount: string): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      buildRoute(ServicesRoutes.verificationAccounts, { idAccount: idAccount }),
      'get'
    );
  }
}
