import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderModule } from '@shared/header/header.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastService } from '@components/toast/toast.service';
import { ToastModule } from '@components/toast/toast.module';
import { MainHttpInterceptor } from './interceptors/main-http-interceptor';
import { FooterModule } from '@shared/footer/footer.module';

const providers = [
  {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: MainHttpInterceptor
  },
  ToastService
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    HttpClientModule,
    ToastModule,
    FooterModule,
    AppRoutes
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
