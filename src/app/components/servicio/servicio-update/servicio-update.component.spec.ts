import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioUpdateComponent } from './servicio-update.component';

describe('ServicioUpdateComponent', () => {
  let component: ServicioUpdateComponent;
  let fixture: ComponentFixture<ServicioUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
