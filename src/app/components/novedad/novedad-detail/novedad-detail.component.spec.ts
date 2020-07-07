import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadDetailComponent } from './novedad-detail.component';

describe('NovedadDetailComponent', () => {
  let component: NovedadDetailComponent;
  let fixture: ComponentFixture<NovedadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovedadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
