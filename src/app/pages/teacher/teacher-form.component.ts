import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';

interface TareaPayload {
  class_grade_id: number;
  title: string;
  description: string;
  due_date: string;
}

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-form.component.html'
})
export class TeacherFormComponent implements OnInit {
  tarea: TareaPayload = {
    class_grade_id: 0,
    title: '',
    description: '',
    due_date: ''
  };

  grupos: any[] = [];
  mensaje: string = '';
  loading: boolean = false;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.cargarGruposDelProfesor();
  }

  cargarGruposDelProfesor(): void {
    this.teacherService.getGruposPorProfesor().subscribe({
      next: res => {
        this.grupos = res;
        if (!res.length) {
          this.mensaje = '⚠️ No tienes grupos asignados actualmente.';
        }
      },
      error: err => {
        console.error('❌ Error al cargar grupos:', err);
        this.mensaje = '❌ No se pudieron obtener los grupos del profesor.';
      }
    });
  }

  seleccionarGrupo(id: number): void {
    this.tarea.class_grade_id = id;
    this.mensaje = '';
  }

  guardarTarea(): void {
    const { title, due_date, class_grade_id } = this.tarea;

    if (!title || !due_date || !class_grade_id) {
      this.mensaje = '⚠️ Por favor completa todos los campos.';
      return;
    }

    this.loading = true;

    this.teacherService.crearTarea(this.tarea).subscribe({
      next: () => {
        this.mensaje = '✅ Tarea asignada correctamente';
        this.loading = false;
        this.tarea = { class_grade_id: 0, title: '', description: '', due_date: '' };
      },
      error: err => {
        console.error('❌ Error al guardar tarea:', err);
        this.mensaje = '❌ No se pudo guardar la tarea';
        this.loading = false;
      }
    });
  }
}
