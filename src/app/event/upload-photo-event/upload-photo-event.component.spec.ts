import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhotoEventComponent } from './upload-photo-event.component';

describe('UploadPhotoEventComponent', () => {
  let component: UploadPhotoEventComponent;
  let fixture: ComponentFixture<UploadPhotoEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPhotoEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPhotoEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
