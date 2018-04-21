import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NicolasBernardComponent } from './nicolas-bernard.component';

describe('NicolasBernardComponent', () => {
  let component: NicolasBernardComponent;
  let fixture: ComponentFixture<NicolasBernardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NicolasBernardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicolasBernardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
