import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ModalService } from '@services/modal-services/modal.service';

@Component({
  selector: 'app-modal',
  template: ` <div class="container-modal2">
    <div class="container-modal2-body">
      <div class="container-content">
        <ng-content></ng-content>
      </div>
    </div>
  </div>`,
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  @Input() id: string;

  private element: any;

  constructor(
    private modalService: ModalService,
    private elementRef: ElementRef
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      return;
    }
    document.body.appendChild(this.element);
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
  }

  close(): void {
    this.element.style.display = 'none';
  }
}
