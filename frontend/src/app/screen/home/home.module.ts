import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { ProductService } from '@services/product-services/product-services';
import { ServiceUtils } from '@services/services-utils/services-utils';
import { FormsModule } from '@angular/forms';
import { TableModule } from '@components/table/table.module';
import { ToastModule } from '@components/toast/toast.module';
import { SkeletonModule } from '@components/skeleton-loader/skeleton-loader.module';

const declarations = [PageHomeComponent];

const imports = [
  CommonModule,
  FormsModule,
  HomeRouting,
  SkeletonModule,
  TableModule,
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

export class HomeModule {}