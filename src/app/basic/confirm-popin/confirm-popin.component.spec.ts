import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopinComponent } from './confirm-popin.component';

describe('ConfirmPopinComponent', () => {
  let component: ConfirmPopinComponent;
  let fixture: ComponentFixture<ConfirmPopinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPopinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
