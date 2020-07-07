import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioDetailComponent } from './servicio-detail.component';

describe('ServicioDetailComponent', () => {
  let component: ServicioDetailComponent;
  let fixture: ComponentFixture<ServicioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
