import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignIn } from './sign-in';

describe('SignIn', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignIn],
    }).compileComponents();

    fixture = TestBed.createComponent(SignIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the trimmed name after submitting the form', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '  Alex Morgan  ';
    input.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('form')?.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Welcome "Alex Morgan"');
  });

  it('trims a name passed directly to signIn', () => {
    component.signIn('  Alex Morgan  ');

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Welcome "Alex Morgan"');
  });
});
