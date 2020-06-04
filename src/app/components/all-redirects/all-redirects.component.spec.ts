import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRedirectsComponent } from './all-redirects.component';

describe('AllRedirectsComponent', () => {
  let component: AllRedirectsComponent;
  let fixture: ComponentFixture<AllRedirectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRedirectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRedirectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
