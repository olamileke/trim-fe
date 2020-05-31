import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUrlComponent } from './view-url.component';

describe('ViewUrlComponent', () => {
  let component: ViewUrlComponent;
  let fixture: ComponentFixture<ViewUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
