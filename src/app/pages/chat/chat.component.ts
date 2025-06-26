import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TeacherService } from '../../services/teacher.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  grupos: any[] = [];
  estudiantes: any[] = [];
  selectedGroupId: number | null = null;
  selectedStudentId: number | null = null;
  mensaje: string = '';
  respuesta: string = '';

  constructor(
    private authService: AuthService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.teacherService.getGruposPorProfesor().subscribe({
      next: grupos => (this.grupos = grupos),
      error: err => {
        console.error('❌ Error al cargar grupos del profesor:', err);
      }
    });
  }

  cargarEstudiantes(): void {
    if (this.selectedGroupId) {
      this.teacherService.getEstudiantesPorGrupo(this.selectedGroupId).subscribe({
        next: data => (this.estudiantes = data),
        error: err => {
          console.error('❌ Error al cargar estudiantes:', err);
        }
      });
    }
  }

  enviarMensaje(): void {
    if (this.selectedStudentId && this.mensaje.trim()) {
      this.teacherService.enviarMensajeAlAcudiente({
        student_id: this.selectedStudentId,
        content: this.mensaje
      }).subscribe({
        next: () => {
          alert('📨 Mensaje enviado al acudiente');
          this.mensaje = '';
          this.respuesta = '';
        },
        error: err => {
          console.error('❌ Error al enviar mensaje:', err);
          this.respuesta = 'No se pudo enviar el mensaje.';
        }
      });
    }
  }
}
