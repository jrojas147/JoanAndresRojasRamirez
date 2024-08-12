import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionAuthGuard } from './guards/session-auth.guard';

const routes: Routes = [
  {
    loadChildren: () => import('@screen/home/home.module').then((m) => m.HomeModule),
    path: '',
  },
  {
    loadChildren: () => import('@screen/registry/registry.module').then((m) => m.RegistryModule),
    path: 'registry',
  },
  {
    // canActivate: [SessionAuthGuard],
    loadChildren: () => import('@screen/registry/registry.module').then((m) => m.RegistryModule),
    path: 'registry/:id',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutes { }