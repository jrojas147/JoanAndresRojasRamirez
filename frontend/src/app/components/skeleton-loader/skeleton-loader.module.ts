import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkeletonLoaderComponent } from './skeleton-loader.component';

const declarations = [SkeletonLoaderComponent];

const imports = [
  CommonModule,
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: imports
})

export class SkeletonModule {}