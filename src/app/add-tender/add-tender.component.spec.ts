import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenderComponent } from './add-tender.component';

describe('AddVendorComponent', () => {
  let component: AddTenderComponent;
  let fixture: ComponentFixture<AddTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
