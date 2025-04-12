import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({ selector: 'app-header', template: '' })
class MockHeaderComponent {}

@Component({ selector: 'app-footer', template: '' })
class MockFooterComponent {}

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainLayoutComponent,
        MockHeaderComponent,
        MockFooterComponent,
      ],
      imports: [RouterOutlet]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
  });

  it('should render the footer component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });

  it('should contain router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
