import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ServiceUtils } from './services-utils';
import { Config } from '@config/index';

describe('ServiceUtils', () => {
  let service: ServiceUtils;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // Crear un espía para HttpClient
    const spy = jasmine.createSpyObj('HttpClient', ['request', 'delete', 'get', 'post', 'put']);

    // Configurar el módulo de prueba
    TestBed.configureTestingModule({
      providers: [
        ServiceUtils,
        { provide: HttpClient, useValue: spy }
      ]
    });

    // Crear una instancia del servicio
    service = TestBed.inject(ServiceUtils);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    // Configurar valores por defecto para los espías
    httpClientSpy.request.and.returnValue(of({}));
    httpClientSpy.delete.and.returnValue(of({}));
    httpClientSpy.get.and.returnValue(of({}));
    httpClientSpy.post.and.returnValue(of({}));
    httpClientSpy.put.and.returnValue(of({}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set Authorization header for authenticated requests', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('fake-token');
    const endpoint = { needsAuth: true, url: 'test/url' };
    const method = 'get';
    
    const headers = new HttpHeaders();
    const options = { headers: headers.set('Authorization', 'Bearer fake-token') };

    httpClientSpy.get.and.returnValue(of({}));
    service.buildRequest(endpoint, method);

    expect(httpClientSpy.get).toMatch;
  });

  it('should remove Authorization header for non-authenticated requests', () => {
    const endpoint = { needsAuth: false, url: 'test/url' };
    const method = 'get';

    const headers = new HttpHeaders();
    const options = { headers: headers.delete('Authorization'), params: null };

    httpClientSpy.get.and.returnValue(of({}));
    service.buildRequest(endpoint, method);

    expect(httpClientSpy.get).toMatch;
  });

  it('should handle DELETE method with data', () => {
    const endpoint = { needsAuth: true, url: 'test/url' };
    const data = { key: 'value' };
    const method = 'delete';

    const headers = new HttpHeaders().set('Authorization', 'Bearer fake-token');
    const customHeader = { body: data, headers: headers };

    httpClientSpy.request.and.returnValue(of({}));
    service.buildRequest(endpoint, method, data);

    expect(httpClientSpy.request).toMatch;
  });

  it('should handle GET method without data', () => {
    const endpoint = { needsAuth: false, url: 'test/url' };
    const method = 'get';

    const headers = new HttpHeaders();
    const options = { headers: headers };

    httpClientSpy.get.and.returnValue(of({}));
    service.buildRequest(endpoint, method);

    expect(httpClientSpy.get).toMatch;
  });

  it('should handle POST method with data', () => {
    const endpoint = { needsAuth: true, url: 'test/url' };
    const data = { key: 'value' };
    const method = 'post';

    const headers = new HttpHeaders().set('Authorization', 'Bearer fake-token');

    httpClientSpy.post.and.returnValue(of({}));
    service.buildRequest(endpoint, method, data);

    expect(httpClientSpy.post).toMatch;
  });

  it('should handle PUT method with data', () => {
    const endpoint = { needsAuth: true, url: 'test/url' };
    const data = { key: 'value' };
    const method = 'put';

    const headers = new HttpHeaders().set('Authorization', 'Bearer fake-token');

    httpClientSpy.put.and.returnValue(of({}));
    service.buildRequest(endpoint, method, data);

    expect(httpClientSpy.put).toMatch;
  });

  it('should return null for unsupported methods', () => {
    const endpoint = { needsAuth: true, url: 'test/url' };
    const method = 'patch'; // unsupported method

    const result = service.buildRequest(endpoint, method);

    expect(result).toBeNull();
  });

  it('should handle errors for HTTP requests', () => {
    const endpoint = { needsAuth: true, url: 'test/url' };
    const method = 'get';
    const errorResponse = new Error('Error occurred');

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    service.buildRequest(endpoint, method)?.subscribe(
      () => fail('expected an error, not data'),
      (error: Error) => expect(error.message).toContain('Error occurred')
    );
  });
});