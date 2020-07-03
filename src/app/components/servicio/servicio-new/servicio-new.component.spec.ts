import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioNewComponent } from './servicio-new.component';

describe('ServicioNewComponent', () => {
  let component: ServicioNewComponent;
  let fixture: ComponentFixture<ServicioNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
