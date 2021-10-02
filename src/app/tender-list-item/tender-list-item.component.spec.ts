import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderListItemComponent } from './tender-list-item.component';

describe('TenderListItemComponent', () => {
  let component: TenderListItemComponent;
  let fixture: ComponentFixture<TenderListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
