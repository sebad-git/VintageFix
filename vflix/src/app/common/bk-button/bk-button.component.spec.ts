import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BkButtonComponent } from './bk-button.component';

describe('BkButtonComponent', () => {
  let component: BkButtonComponent;
  let fixture: ComponentFixture<BkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BkButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
