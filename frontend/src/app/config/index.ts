import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders() };

httpOptions.headers = httpOptions.headers
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json; text/plain');

const Config = {
  api: {
    baseUrl: environment.serviceUrl,
    options: httpOptions,
    timeout: 3000,
  },
};

export { Config };
