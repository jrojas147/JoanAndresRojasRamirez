import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

const declarations = [ToastComponent];

const imports = [CommonModule];

const providers = [ToastService];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: imports,
  providers: providers
})
export class ToastModule {}
