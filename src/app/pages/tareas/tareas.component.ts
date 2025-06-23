import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaService, Task } from '../../services/task.services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  templateUrl: './tareas.component.html',
  imports: [CommonModule],
})
export class TareasComponent implements OnInit {
  tareas: Task[] = [];
  userRole: string | null = '';
  grupos: any[] = [];
  selectedGroupId: number | null = null;

  constructor(
    private tareaService: TareaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getFullUser();
    this.userRole = this.authService.getUserRole();

    if (this.userRole === 'parent') {
      this.tareaService.getTareasPorPadre(user?.id).subscribe((tareas: Task[]) => {
        this.tareas = tareas;
      });
    } else if (this.userRole === 'teacher') {
      this.tareaService.getGruposPorProfesor(user?.id).subscribe(grupos => {
        this.grupos = grupos;
      });
    }
  }

  cargarTareasDelGrupo(): void {
    if (this.selectedGroupId) {
      this.tareaService.getTareasPorGrupo(this.selectedGroupId).subscribe((tareas: Task[]) => {
        this.tareas = tareas;
      });
    }
  }
}
