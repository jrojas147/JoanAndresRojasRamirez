import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageRegistryComponent } from './registry.component';
import { RegistryRouting } from './registry.routing';
import { ProductService } from '@services/product-services/product-services';
import { ServiceUtils } from '@services/services-utils/services-utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '@components/toast/toast.component';
import { ToastModule } from '@components/toast/toast.module';
import { SkeletonModule } from '@components/skeleton-loader/skeleton-loader.module';

const declarations = [PageRegistryComponent, 
];

const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RegistryRouting,
  SkeletonModule,
  ToastModule
];

const providers = [
  ProductService,
  ServiceUtils
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: imports,
  providers: providers
})

export class RegistryModule {}