import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoComponent } from './afiliado.component';

describe('AfiliadoComponent', () => {
  let component: AfiliadoComponent;
  let fixture: ComponentFixture<AfiliadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfiliadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
