import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeService, Grade } from '../../services/grade.service';
import { GradeFormComponent } from './grade-form/grade-form.component';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, GradeFormComponent],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  grados: Grade[] = [];
  selectedGrade: Grade | undefined = undefined;

  constructor(private gradeService: GradeService) {}

  ngOnInit(): void {
    this.cargarGrados();
  }

  cargarGrados(): void {
    this.gradeService.getAll().subscribe({
      next: (data) => {
        this.grados = data;
        console.log('📚 Grados cargados:', data);
      },
      error: (err) => {
        console.error('❌ Error al obtener grados:', err);
      }
    });
  }

  crearGrado(): void {
    this.selectedGrade = { id: undefined, name: '' };
  }

  editarGrado(grado: Grade): void {
    this.selectedGrade = { ...grado };
  }

  eliminarGrado(id: number): void {
    if (confirm('¿Estás seguro de eliminar este grado?')) {
      this.gradeService.delete(id).subscribe({
        next: () => {
          console.log('🗑 Grado eliminado');
          this.cargarGrados();
        },
        error: (err) => {
          console.error('❌ Error al eliminar el grado:', err);
        }
      });
    }
  }

  guardarGrado(gradeData: Grade): void {
    if (!gradeData.id) {
      this.gradeService.create(gradeData).subscribe({
        next: () => {
          console.log('✅ Grado creado');
          this.cargarGrados();
          this.selectedGrade = undefined;
        },
        error: (err) => {
          console.error('❌ Error al crear el grado:', err);
        }
      });
    } else {
      this.gradeService.update(gradeData.id, gradeData).subscribe({
        next: () => {
          console.log('✅ Grado actualizado');
          this.cargarGrados();
          this.selectedGrade = undefined;
        },
        error: (err) => {
          console.error('❌ Error al actualizar el grado:', err);
        }
      });
    }
  }

  cancelarFormulario(): void {
    this.selectedGrade = undefined;
  }
}
