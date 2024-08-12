import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastModel } from './toast.model';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `<div
    *ngIf="toastModel.visible"
    class="toast"
    [ngClass]="toastModel.position"
  >
    <div class="toast-grid">
      <div *ngIf="toastModel.type" class="img flexbox-center">
        <img
          *ngIf="toastModel.type == 'error'"
          src="assets/icons/error.svg"
          width="70"
        />
        <img
          *ngIf="toastModel.type == 'warning'"
          src="assets/icons/warning.svg"
          width="70"
        />
        <img
          *ngIf="toastModel.type == 'info'"
          src="assets/icons/info.svg"
          width="70"
        />
      </div>

      <div class="title">{{ toastModel.title }}</div>
      <div class="message">{{ toastModel.message }}</div>

      <div class="btn-close flexbox-center">
        <img (click)="close()" src="assets/icons/close.svg" style="margin-top:4px" width="25" />
      </div>
    </div>
  </div>`,
})
export class ToastComponent implements OnDestroy {
  public toastModel: ToastModel;

  private $subscriptions: Subscription;

  constructor(private _toastService: ToastService) {
    this.$subscriptions = this._toastService.toastState.subscribe(
      (toastModel: ToastModel) => {
        this.toastModel = toastModel;
      }
    );
  }

  public close(): void {
    this.toastModel.visible = false;
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }
}
