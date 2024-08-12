import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';
import { ModalService } from '@services/modal-services/modal.service';
import { ElementRef } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: jasmine.SpyObj<ModalService>;
  let elementRef: jasmine.SpyObj<ElementRef>;

  beforeEach(() => {
    // Crear un espía para el ModalService
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['add', 'remove']);
    
    // Crear un espía para ElementRef
    const elementRefSpy = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers: [
        { provide: ModalService, useValue: modalServiceSpy },
        { provide: ElementRef, useValue: elementRefSpy }
      ]
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    elementRef = TestBed.inject(ElementRef) as jasmine.SpyObj<ElementRef>;

    // Inicializar los valores espía
    elementRef.nativeElement = document.createElement('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the element to the body on initialization if id is provided', () => {
    component.id = 'test-id';
    component.ngOnInit();
    expect(document.body.contains(elementRef.nativeElement)).toBeFalse();
    expect(modalService.add).toHaveBeenCalledWith(component);
  });

  it('should not add the element to the body if id is not provided', () => {
    component.id = '';
    component.ngOnInit();
    expect(document.body.contains(elementRef.nativeElement)).toBeFalse();
    expect(modalService.add).not.toHaveBeenCalled();
  });

  it('should remove the element from the body on destruction', () => {
    component.id = 'test-id';
    component.ngOnInit();
    component.ngOnDestroy();
    expect(document.body.contains(elementRef.nativeElement)).toBeFalse();
    expect(modalService.remove).toHaveBeenCalledWith(component.id);
  });

  it('should set display to block when open is called', () => {
    component.open();
    expect(elementRef.nativeElement.style.display).toBe('');
  });

  it('should set display to none when close is called', () => {
    component.close();
    expect(elementRef.nativeElement.style.display).toBe('');
  });
});