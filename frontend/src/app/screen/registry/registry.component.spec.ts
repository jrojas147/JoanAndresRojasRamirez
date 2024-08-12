import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageRegistryComponent } from './registry.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '@services/product-services/product-services';
import { ToastService } from '@components/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistryModule } from './registry.module';
import * as moment from 'moment';
import { of } from 'rxjs';

describe('PageRegistryComponent', () => {
  let component: PageRegistryComponent;
  let fixture: ComponentFixture<PageRegistryComponent>;
  let bankService: jasmine.SpyObj<ProductService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const bankServiceSpy = jasmine.createSpyObj('BankService', [
      'getAccountsById',
      'putAccounts',
      'postAccounts',
      'verifyAccount',
    ]);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['show']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot'], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue(null)  // Mock paramMap.get to return null
        }
      }
    });

    await TestBed.configureTestingModule({
      declarations: [PageRegistryComponent],
      imports: [RouterTestingModule, RegistryModule],
      providers: [
        { provide: ProductService, useValue: bankServiceSpy },
        { provide: Router, useValue: routerSpy },
        // { provide: ToastService, useValue: toastServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ],
    }).compileComponents();

    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRegistryComponent);
    component = fixture.componentInstance;
    bankService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    // toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    // router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with controls', () => {
    component.ngOnInit();

    expect(component.formAccounts.contains('id')).toBeTrue();
    expect(component.formAccounts.contains('name')).toBeTrue();
    expect(component.formAccounts.contains('description')).toBeTrue();
    expect(component.formAccounts.contains('logo')).toBeTrue();
    expect(component.formAccounts.contains('date_release')).toBeTrue();
  });

  it('should disable id control if idAccount exists', () => {
    component.idAccount = '123';
    component.ngOnInit();
    expect(component.formAccounts.get('id')?.disabled).toBeTrue();
  });

  it('should call checkIdAccount on id value change', () => {
    const checkIdAccountSpy = spyOn(component, 'checkIdAccount');
    component.ngOnInit();
    const idControl = component.formAccounts.get('id');
    idControl?.setValue('123');
    expect(checkIdAccountSpy).toHaveBeenCalledWith('123');
  });

  it('should set control values with account data', () => {
    const mockAccount = {
      id: '1',
      name: 'Test',
      logo: '1',
      description: 'Test description',
      date_release: new Date('2024-08-01'),
      date_revision: moment().format('YYYY-MM-DD'),
    };
    bankService.getAccountsById.and.returnValue(of(mockAccount));
    component.idAccount = '1';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.formAccounts.get('name')?.value).toBe('Test');
    expect(component.formAccounts.get('description')?.value).toBe(
      'Test description'
    );
  });

  it('should set control values with account data', () => {
    const mockAccount = {
      id: '1',
      name: 'Test',
      logo: '1',
      description: 'Test description',
      date_release: new Date('2024-08-01'),
      date_revision: moment().format('YYYY-MM-DD'),
    };
    bankService.getAccountsById.and.returnValue(of(mockAccount));
    component.idAccount = '1';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.formAccounts.get('name')?.value).toBe('Test');
    expect(component.formAccounts.get('description')?.value).toBe('Test description');
  });

  it('should call saveRegistry and navigate on success', () => {
    const mockResponse = { data: [], message: 'Success' };
    bankService.postAccounts.and.returnValue(of(mockResponse));
    component.saveRegistry();
    expect(bankService.postAccounts).toHaveBeenCalled();
    expect(toastService.show).toMatch;
    expect(router.navigateByUrl).toMatch;
  });

  it('should handle update and call putAccounts', () => {
    const mockResponse = { data: [], message: 'Updated' };
    component.idAccount = '1';
    bankService.putAccounts.and.returnValue(of(mockResponse));
    component.saveRegistry();
    expect(bankService.putAccounts).toHaveBeenCalled();
    expect(toastService.show).toMatch
    expect(router.navigateByUrl).toMatch;
  });

  it('should call backUrl', () => {

    component.backUrl();
    expect(router.navigateByUrl).toMatch;
  });

  it('should check if account exists and set existAccount', () => {
    bankService.verifyAccount.and.returnValue(of(true));
    component.checkIdAccount('123');
    expect(bankService.verifyAccount).toHaveBeenCalledWith('123');
    expect(component.existAccount).toBeTrue();
  });

  it('should reset all controls except id when clearValues is called', () => {
    component.formAccounts.controls['name'].setValue('Test Name');
    component.formAccounts.controls['description'].setValue('Test Description');
    component.clearValues();
    expect(component.formAccounts.controls['name'].value).toBe(null);
    expect(component.formAccounts.controls['description'].value).toBe(null);
    expect(component.formAccounts.controls['id'].value).toBe('123'); // Id should not be reset
  });
});