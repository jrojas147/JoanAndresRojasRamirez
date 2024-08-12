import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '@components/modal/modal.module';

const declarations = [TableComponent];

const imports = [
  CommonModule,
  FormsModule,
  ModalModule
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: imports
})

export class TableModule {}