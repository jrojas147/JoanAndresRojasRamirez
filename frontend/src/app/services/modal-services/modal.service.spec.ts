import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('add()', () => {
    const id = 'modal-1';
    service.add(id);
    console.log(service.modals)
    expect(service.modals).toEqual(['modal-1']);
  });

  it('open()', () => {
    const id = 'modal-1';
    service.modals = [{ id: 'modal-1', open: () => { } }];
    service.open(id);
  });

  it('close()', () => {
    const id = 'modal-1';
    service.modals = [{ id: 'modal-1', close: () => { } }];
    service.close(id);
  });

  it('remove()', () => {
    const id = 'modal-1';
    service.modals = ['modal-1', 'modal-2'];
    service.remove(id);
    expect(service.modals).toEqual(['modal-1', 'modal-2']);
  });

});
