import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRedirectComponent } from './view-redirect.component';

describe('ViewRedirectComponent', () => {
  let component: ViewRedirectComponent;
  let fixture: ComponentFixture<ViewRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
