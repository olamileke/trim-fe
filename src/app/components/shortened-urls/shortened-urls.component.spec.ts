import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenedUrlsComponent } from './shortened-urls.component';

describe('ShortenedUrlsComponent', () => {
  let component: ShortenedUrlsComponent;
  let fixture: ComponentFixture<ShortenedUrlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortenedUrlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortenedUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
