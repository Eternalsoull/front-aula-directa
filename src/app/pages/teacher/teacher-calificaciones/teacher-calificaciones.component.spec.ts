import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCalificacionesComponent } from './teacher-calificaciones.component';

describe('TeacherCalificacionesComponent', () => {
  let component: TeacherCalificacionesComponent;
  let fixture: ComponentFixture<TeacherCalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCalificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
