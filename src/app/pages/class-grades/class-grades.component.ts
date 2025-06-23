import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassGradeService, ClassGrade } from '../../services/class-grade.service';
import { ClassService, Class } from '../../services/class.service';
import { GradeService, Grade } from '../../services/grade.service';
import { TeacherService, Teacher } from '../../services/teacher.service';
import { ClassGradesFormComponent } from './class-grades-form.component';

@Component({
  selector: 'app-class-grades',
  standalone: true,
  imports: [CommonModule, ClassGradesFormComponent],
  templateUrl: './class-grades.component.html',
})
export class ClassGradesComponent implements OnInit {
  relations: ClassGrade[] = [];
  selectedRelation: ClassGrade | undefined = undefined;

  classes: Class[] = [];
  grades: Grade[] = [];
  teachers: Teacher[] = [];

  constructor(
    private service: ClassGradeService,
    private classService: ClassService,
    private gradeService: GradeService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.service.getAll().subscribe(data => this.relations = data);
    this.classService.getAll().subscribe(data => this.classes = data);
    this.gradeService.getAll().subscribe(data => this.grades = data);
    this.teacherService.getAll().subscribe(data => this.teachers = data);
  }

  nuevaRelacion(): void {
    this.selectedRelation = { class_id: 0, grade_id: 0, teacher_id: 0 };
  }

  editarRelacion(rel: ClassGrade): void {
    this.selectedRelation = { ...rel };
  }

  eliminarRelacion(id: number): void {
    if (confirm('¿Eliminar esta relación?')) {
      this.service.delete(id).subscribe(() => this.cargarDatos());
    }
  }

  guardarRelacion(rel: ClassGrade): void {
    if (!rel.id) {
      this.service.create(rel).subscribe(() => {
        this.cargarDatos();
        this.selectedRelation = undefined;
      });
    } else {
      this.service.update(rel.id, rel).subscribe(() => {
        this.cargarDatos();
        this.selectedRelation = undefined;
      });
    }
  }

  cancelarFormulario(): void {
    this.selectedRelation = undefined;
  }
}