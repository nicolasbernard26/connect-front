import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvolvesComponent } from './involves.component';

describe('InvolvesComponent', () => {
  let component: InvolvesComponent;
  let fixture: ComponentFixture<InvolvesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvolvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvolvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
