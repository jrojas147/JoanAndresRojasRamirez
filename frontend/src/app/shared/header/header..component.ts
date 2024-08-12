import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `<section class="header">
    <div *ngIf="actionHome" class="action-img" (click)="homeUrl()">
      <img src="assets/img/homeIcon.jpg" width="24"/>
    </div>
    
      <img src="assets/img/logo.png" class="img-fluid height" alt="" />
    </section>`,
})
export class HeaderComponent {
  @Input() actionHome: boolean;

  constructor(private router: Router) {}

  homeUrl() {
    this.router.navigateByUrl('/');
  }
}