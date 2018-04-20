import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvolvementComponent } from './add-involvement.component';

describe('AddInvolvementComponent', () => {
  let component: AddInvolvementComponent;
  let fixture: ComponentFixture<AddInvolvementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvolvementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvolvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
