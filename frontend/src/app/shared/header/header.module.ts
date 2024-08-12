import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header..component';

const declarations = [HeaderComponent];

const imports = [
  CommonModule,
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: imports
})

export class HeaderModule {}