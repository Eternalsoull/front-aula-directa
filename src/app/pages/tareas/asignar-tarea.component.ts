import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TareaService } from '../../services/task.services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-asignar-tarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asignar-tarea.component.html',
})
export class AsignarTareaComponent implements OnInit {
  tareaForm!: FormGroup;
  grupos: any[] = [];
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getFullUser();
    this.userId = user?.id;

    this.tareaForm = this.fb.group({
      class_grade_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      due_date: ['', Validators.required],
    });

    this.tareaService.getGruposPorProfesor(this.userId).subscribe(grupos => {
      this.grupos = grupos;
    });
  }

  asignarTarea(): void {
    if (this.tareaForm.invalid) return;

    this.tareaService.crearTarea(this.tareaForm.value).subscribe({
      next: res => {
        alert('✅ Tarea asignada correctamente');
        this.tareaForm.reset();
      },
      error: err => {
        console.error('❌ Error al asignar tarea', err);
        alert('Ocurrió un error al asignar la tarea');
      }
    });
  }
}
