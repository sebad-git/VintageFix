import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BkDropdownComponent } from './bk-dropdown.component';

describe('BkDropdownComponent', () => {
  let component: BkDropdownComponent;
  let fixture: ComponentFixture<BkDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BkDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BkDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
