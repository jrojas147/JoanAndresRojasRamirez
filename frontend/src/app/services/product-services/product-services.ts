import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildRoute, ServicesRoutes } from '../../utils/services-routes';
import { ServiceUtils } from '../services-utils/services-utils';
import {  AccountsModel } from '../../models/accounts.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private serviceUtils: ServiceUtils) {}

  /**
   * Peticion que contiene llamado a todos los productos
   * @returns productos 
   */
  public getAccounts(): Observable<any> | null {
    return this.serviceUtils.buildRequest(ServicesRoutes.getAccounts, 'get');
  }

  /**
   * Permite consultar informacion de producto por id
   * @param idAccount id de valor que se edita
   * @returns datos de producto que se consulta
   */
  public getAccountsById(idAccount: string): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      buildRoute(ServicesRoutes.getAccountsById, { idAccount: idAccount }),
      'get'
    );
  }

  /**
   * Peticion que permite guardar producto
   * @param data contiene informacion del producto a registrar
   * @returns 
   */
  public postAccounts(data: AccountsModel): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      ServicesRoutes.postAccounts,
      'post',
      data
    );
  }

  /**
   * metodo que permite actualizar producto
   * @param data contiene valores que se actualizan
   * @returns confirmacion de actualizacion.
   */
  public putAccounts(data: AccountsModel): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      buildRoute(ServicesRoutes.putAccounts, { idAccount: data.id }),
      'put',
      data
    );
  }

  /**
   * Metodo que permite eliminar producto
   * @param data datos que se eliminiaran
   * @returns mensaje de confimacion eliminacion de producto
   */
  public deleteAccounts(data: AccountsModel): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      buildRoute(ServicesRoutes.deleteAccounts, { idAccount: data.id }),
      'delete'
    );
  }

  /**
   * Permite verificar si exixte un producto
   * @param idAccount id Producto
   * @returns boolean confirmando existencia
   */
  public verifyAccount(idAccount: string): Observable<any> | null {
    return this.serviceUtils.buildRequest(
      buildRoute(ServicesRoutes.verificationAccounts, { idAccount: idAccount }),
      'get'
    );
  }
}
