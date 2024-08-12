import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header..component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
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
});