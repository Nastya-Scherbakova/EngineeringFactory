import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoefficientTableComponent } from './coefficient-table.component';

describe('CoefficientTableComponent', () => {
  let component: CoefficientTableComponent;
  let fixture: ComponentFixture<CoefficientTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoefficientTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoefficientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
