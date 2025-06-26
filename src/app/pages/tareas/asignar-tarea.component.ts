import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-asignar-tarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asignar-tarea.component.html',
})
export class AsignarTareaComponent implements OnInit {
  formulario!: FormGroup;
  grupos: any[] = [];
  tareasDelGrupo: any[] = [];
  mostrarTareas: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      class_grade_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      due_date: ['', Validators.required],
    });

    this.taskService.getGruposAsignados().subscribe({
      next: (grupos) => (this.grupos = grupos),
      error: (err) => console.error('❌ Error al obtener grupos', err)
    });

    this.formulario.get('class_grade_id')?.valueChanges.subscribe(groupId => {
      this.mostrarTareas = false;
      if (groupId) {
        this.taskService.getTareasPorGrupo(groupId).subscribe({
          next: tareas => this.tareasDelGrupo = tareas,
          error: err => console.error('❌ Error al cargar tareas del grupo', err)
        });
      } else {
        this.tareasDelGrupo = [];
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) return;

    const grupoSeleccionado = this.formulario.value.class_grade_id;

    this.taskService.crearTarea(this.formulario.value).subscribe({
      next: () => {
        alert('✅ Tarea asignada correctamente');
        this.formulario.reset();
        this.formulario.get('class_grade_id')?.setValue(grupoSeleccionado);
        this.taskService.getTareasPorGrupo(grupoSeleccionado).subscribe({
          next: tareas => this.tareasDelGrupo = tareas
        });
        this.mostrarTareas = true;
      },
      error: err => {
        console.error('❌ Error al asignar tarea', err);
        alert('Ocurrió un error al asignar la tarea');
      }
    });
  }

  alternarTareas(): void {
    this.mostrarTareas = !this.mostrarTareas;
  }
}
