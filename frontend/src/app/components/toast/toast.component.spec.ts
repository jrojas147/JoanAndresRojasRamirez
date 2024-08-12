import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
import { ToastModel, ToastPosition, ToastType } from './toast.model';

describe('ToastService', () => {
  let service: ToastService;
  let toastStateSpy: jasmine.SpyObj<BehaviorSubject<ToastModel>>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('BehaviorSubject', ['next']);

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: BehaviorSubject, useValue: spy }
      ]
    });

    service = TestBed.inject(ToastService);
    toastStateSpy = TestBed.inject(BehaviorSubject) as jasmine.SpyObj<BehaviorSubject<ToastModel>>;

    toastStateSpy.next.and.callFake(() => {
      // Permitir que el `next` funcione como se espera
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});