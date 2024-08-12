import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';

const declarations = [FooterComponent];

const imports = [
  CommonModule,
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: imports
})

export class FooterModule {}