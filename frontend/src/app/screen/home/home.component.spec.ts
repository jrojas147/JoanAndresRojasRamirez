import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PageHomeComponent } from './home.component';
import { ProductService } from '@services/product-services/product-services';
import { ToastService } from '@components/toast/toast.service';
import {
  AccountsListModel,
  AccountsModel,
} from 'src/app/models/accounts.model';

describe('PageHomeComponent', () => {
  let component: PageHomeComponent;
  let fixture: ComponentFixture<PageHomeComponent>;
  let bankService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;
  let toastService: jasmine.SpyObj<ToastService>;
  let mockIncidencesService: jasmine.SpyObj<ProductService>

  beforeEach(async () => {
    const bankServiceSpy = jasmine.createSpyObj('BankService', [
      'getAccounts',
      'deleteAccounts',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [PageHomeComponent],
      providers: [
        { provide: ProductService, useValue: bankServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;
    bankService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load list on ngOnInit', () => {
    const mockAccounts: AccountsListModel = {
      data: [
        {
          id: '1',
          name: 'Test',
          logo: '1',
          description: 'Test description',
          date_release: new Date('2024-08-01'),
          date_revision: new Date('2024-08-01'),
        },
      ],
    };
    bankService.getAccounts.and.returnValue(of(mockAccounts));

    component.ngOnInit();

    expect(bankService.getAccounts).toHaveBeenCalled();
    expect(component.listAccounts).toEqual(mockAccounts.data);
  });

  it('should handle emitTable actions', () => {
    const mockAccount: AccountsModel = {
      id: '1',
          name: 'Test',
          logo: '1',
          description: 'Test description',
          date_release: new Date('2024-08-01'),
          date_revision: new Date('2024-08-01'),
    };

    // Test add action
    component.emitTable({ action: 'add' });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/registry');

    // Test edit action
    component.emitTable({ action: 'edit', data: mockAccount });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/registry/1');

    // Test delete action
    const mockResponse: AccountsListModel = { data: [] };
    bankService.deleteAccounts.and.returnValue(of(mockResponse)); // Mock observable
    component.emitTable({ action: 'delete', data: mockAccount });
    expect(bankService.deleteAccounts).toHaveBeenCalledWith(mockAccount);
    expect(toastService.show).toHaveBeenCalledWith('Exitoso', '');
    expect(bankService.getAccounts).toHaveBeenCalled();
  });
});
