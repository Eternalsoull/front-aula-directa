import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { TeacherService } from '../../../services/teacher.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  profesorId: number | null = null;
  grupos: any[] = [];
  estudiantes: any[] = [];
  selectedGroupId: number | null = null;
  selectedStudentId: number | null = null;
  mensaje: string = '';

  constructor(
    private authService: AuthService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.profesorId = this.authService.getFullUser()?.id;
    if (this.profesorId) {
      this.teacherService.getGruposPorProfesor(this.profesorId).subscribe((grupos) => {
        this.grupos = grupos;
      });
    }
  }

  cargarEstudiantes(): void {
    if (this.selectedGroupId) {
      this.teacherService.getEstudiantesPorGrupo(this.selectedGroupId).subscribe((data) => {
        this.estudiantes = data;
      });
    }
  }

  enviarMensaje(): void {
    if (this.selectedStudentId && this.mensaje.trim()) {
      this.teacherService.enviarMensajeAlAcudiente({
        student_id: this.selectedStudentId,
        content: this.mensaje
      }).subscribe(() => {
        alert('📨 Mensaje enviado al acudiente');
        this.mensaje = '';
      });
    }
  }
}
