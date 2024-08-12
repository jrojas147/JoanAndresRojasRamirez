import { HttpClient } from '@angular/common/http';
import { Config } from '@config/index';
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceUtils {
  constructor(private http: HttpClient) {}

  public buildRequest(endpoint: any, method: string, data?: any) {
    const headers = Config.api.options;

    if (endpoint.needsAuth) {
      headers.headers = headers.headers.set(
        'Authorization',
        'Bearer ' + sessionStorage.getItem('token')
      );
    } else {
      headers.headers = headers.headers.delete('Authorization');
    }

    switch (method) {
      case 'delete':
        if (data) {
          const customHeader = {
            body: data,
            headers: headers.headers,
          };

          return this.http.request('delete', endpoint.url, customHeader);
        }

        return this.http.delete<any>(endpoint.url, headers);
      case 'get':
        const options = {
          headers: headers.headers,
          params: data || null,
        };

        return this.http.get<any>(endpoint.url, options);
      case 'post':
        return this.http.post<any>(endpoint.url, data, headers);
      case 'put':
        return this.http.put<any>(endpoint.url, data, headers);
      default:
        return null;
    }
  }
}
