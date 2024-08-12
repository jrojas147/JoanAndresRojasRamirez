import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { FormsModule } from '@angular/forms';

const declarations = [ModalComponent];

const imports = [
  CommonModule,
  FormsModule
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: imports
})

export class ModalModule {}