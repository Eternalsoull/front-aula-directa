import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas-acudiente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas-acudiente.component.html'
})
export class TareasAcudienteComponent implements OnInit {
  tareas: any[] = [];
  user: any = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getFullUser();

    if (this.user?.id) {
      this.taskService.getTareasPorPadre(this.user.id).subscribe({
        next: (tareas) => this.tareas = tareas,
        error: (err) => console.error('❌ Error al obtener tareas del acudiente', err)
      });
    }
  }
}
