import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductService } from '@services/product-services/product-services';
import { ServiceUtils } from '@services/services-utils/services-utils';
import { buildRoute, ServicesRoutes } from '@utils/services-routes';
import { AccountsListModel, AccountsModel } from '../../models/accounts.model';

// Mocks
const mockAccounts: AccountsListModel = {
  data: [
    {
      id: '1',
      name: 'Test',
      logo: '1',
      description: 'Test description',
      date_release: new Date('2024-08-01'),
      date_revision: new Date('2024-08-01'),
    },
  ],
};
const mockAccount: AccountsModel = {
  id: '1',
  name: 'Test',
  logo: '1',
  description: 'Test description',
  date_release: new Date('2024-08-01'),
  date_revision: new Date('2024-08-01'),
};

describe('BankService', () => {
  let service: ProductService;
  let serviceUtilsSpy: jasmine.SpyObj<ServiceUtils>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ServiceUtils', ['buildRequest']);

    TestBed.configureTestingModule({
      providers: [ProductService, { provide: ServiceUtils, useValue: spy }],
    });

    service = TestBed.inject(ProductService);
    serviceUtilsSpy = TestBed.inject(
      ServiceUtils
    ) as jasmine.SpyObj<ServiceUtils>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call buildRequest with getAccounts', () => {
    serviceUtilsSpy.buildRequest.and.returnValue(of(mockAccounts));

    service.getAccounts()?.subscribe((response) => {
      expect(response).toEqual(mockAccounts);
    });

    expect(serviceUtilsSpy.buildRequest).toHaveBeenCalledWith(
      ServicesRoutes.getAccounts,
      'get'
    );
  });

  it('should call buildRequest with getAccountsById', () => {
    serviceUtilsSpy.buildRequest.and.returnValue(of(mockAccount));

    service.getAccountsById('1')?.subscribe((response) => {
      expect(response).toEqual(mockAccount);
    });

    expect(serviceUtilsSpy.buildRequest).toHaveBeenCalledWith(
      buildRoute(ServicesRoutes.getAccountsById, { idAccount: '1' }),
      'get'
    );
  });

  it('should call buildRequest with postAccounts', () => {
    serviceUtilsSpy.buildRequest.and.returnValue(of(mockAccount));

    service.postAccounts(mockAccount)?.subscribe((response) => {
      expect(response).toEqual(mockAccount);
    });

    expect(serviceUtilsSpy.buildRequest).toHaveBeenCalledWith(
      ServicesRoutes.postAccounts,
      'post',
      mockAccount
    );
  });

  it('should call buildRequest with putAccounts', () => {
    serviceUtilsSpy.buildRequest.and.returnValue(of(mockAccount));

    service.putAccounts(mockAccount)?.subscribe((response) => {
      expect(response).toEqual(mockAccount);
    });

    expect(serviceUtilsSpy.buildRequest).toHaveBeenCalledWith(
      buildRoute(ServicesRoutes.putAccounts, { idAccount: '1' }),
      'put',
      mockAccount
    );
  });

  it('should call buildRequest with deleteAccounts', () => {
    serviceUtilsSpy.buildRequest.and.returnValue(of(null));

    service.deleteAccounts(mockAccount)?.subscribe((response) => {
      expect(response).toBeNull();
    });

    expect(serviceUtilsSpy.buildRequest).toHaveBeenCalledWith(
      buildRoute(ServicesRoutes.deleteAccounts, { idAccount: '1' }),
      'delete'
    );
  });

  it('should call buildRequest with verifyAccount', () => {
    serviceUtilsSpy.buildRequest.and.returnValue(of(mockAccount));

    service.verifyAccount('1')?.subscribe((response) => {
      expect(response).toEqual(mockAccount);
    });

    expect(serviceUtilsSpy.buildRequest).toHaveBeenCalledWith(
      buildRoute(ServicesRoutes.verificationAccounts, { idAccount: '1' }),
      'get'
    );
  });

  it('should handle errors from buildRequest', () => {
    const errorResponse = new Error('Error occurred');
    serviceUtilsSpy.buildRequest.and.returnValue(throwError(errorResponse));

    service.getAccounts()?.subscribe(
      () => fail('expected an error, not data'),
      (error: Error) => expect(error.message).toContain('Error occurred')
    );
  });
});
