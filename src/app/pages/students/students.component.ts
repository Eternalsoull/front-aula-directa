import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { GradeService, Grade } from '../../services/grade.service';
import { ParentService, Parent } from '../../services/parent.service';
import { StudentFormComponent } from './student-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, StudentFormComponent],
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  selectedStudent: Student | null = null;

  grades: Grade[] = [];
  parents: Parent[] = [];

  constructor(
    private studentService: StudentService,
    private gradeService: GradeService,
    private parentService: ParentService
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.cargarGrades();
    this.cargarParents();
  }

  cargarEstudiantes(): void {
    this.studentService.getAll().subscribe((data) => (this.students = data));
  }

  cargarGrades(): void {
    this.gradeService.getAll().subscribe((data) => (this.grades = data));
  }

  cargarParents(): void {
    this.parentService.getAll().subscribe((parents) => {
  this.parents = parents;
  console.log('👪 Acudientes cargados:', parents);
});

  }

  nuevoEstudiante(): void {
    this.selectedStudent = { name: '', grade_id: 0, parent_id: 0 };
  }

  editarEstudiante(student: Student): void {
    this.selectedStudent = { ...student };
  }

  eliminarEstudiante(id: number): void {
    this.studentService.delete(id).subscribe(() => this.cargarEstudiantes());
  }

  guardarEstudiante(student: Student): void {
    if (student.id) {
      this.studentService
        .update(student.id, student)
        .subscribe(() => this.cargarEstudiantes());
    } else {
      this.studentService
        .create(student)
        .subscribe(() => this.cargarEstudiantes());
    }
    this.selectedStudent = null;
  }

  cancelarFormulario(): void {
    this.selectedStudent = null;
  }

  getNombreGrado(id: number): string {
  const grado = this.grades.find(g => g.id === id);
  return grado ? grado.name : 'Sin grado';
}

getNombreAcudiente(id: number): string {
  const parent = this.parents.find(p => p.id === id);
  return parent && parent.user ? parent.user.name : `Acudiente #${id}`;
}

}
