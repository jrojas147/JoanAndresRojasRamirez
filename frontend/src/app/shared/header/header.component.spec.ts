import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header..component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a section with class "header"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.header')).toBeTruthy();
  });

  it('should contain an img with src "assets/img/logo.png"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('assets/img/logo.png');
  });

  it('should have img with class "img-fluid height"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.classList.contains('img-fluid')).toBeTrue();
    expect(img?.classList.contains('height')).toBeTrue();
  });

  it('should have img with empty alt attribute', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('alt')).toBe('');
  });

  it('should navigate to home when homeUrl is called', () => {
    component.homeUrl();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});