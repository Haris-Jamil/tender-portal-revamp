import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFilterComponent } from './applied-filter.component';

describe('AppliedFilterComponent', () => {
  let component: AppliedFilterComponent;
  let fixture: ComponentFixture<AppliedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
