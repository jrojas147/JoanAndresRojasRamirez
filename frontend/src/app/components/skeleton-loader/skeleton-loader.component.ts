import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  template: `<div class="skeleton-loader">
    <div class="skeleton-header" [style.height]="height + 'px'"></div>
  </div>`,
})
export class SkeletonLoaderComponent {
  @Input() height: number;
}
