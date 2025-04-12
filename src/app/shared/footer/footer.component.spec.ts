import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentYear to the current year', () => {
    const expectedYear = new Date().getFullYear();
    expect(component.currentYear).toEqual(expectedYear);
  });

  it('should render current year in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(new Date().getFullYear().toString());
  });
});
