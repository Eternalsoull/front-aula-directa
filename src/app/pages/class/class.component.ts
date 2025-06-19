import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassService, Class } from '../../services/class.service';
import { ClassFormComponent } from './class-form.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  standalone: true,
  imports: [CommonModule, ClassFormComponent],
})
export class ClassComponent implements OnInit {
  classes: Class[] = [];
  selectedClass: Class | undefined = undefined;

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases(): void {
    this.classService.getAll().subscribe(
      (data: Class[]) => {
        this.classes = data;
        console.log('📚 Clases cargadas:', data);
      },
      error => {
        console.error('❌ Error al obtener clases:', error);
      }
    );
  }

  nuevaClase(): void {
    this.selectedClass = { id: undefined, name: '' };
  }

  editarClase(clase: Class): void {
    this.selectedClass = { ...clase }; // Abre el formulario con los datos actuales
  }

  eliminarClase(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta clase?')) {
      this.classService.delete(id).subscribe({
        next: () => {
          console.log('🗑️ Clase eliminada');
          this.cargarClases();
        },
        error: (err) => {
          console.error('❌ Error al eliminar la clase:', err);
        }
      });
    }
  }

  guardarClase(classData: Class): void {
    console.log('📌 Datos antes de enviar al backend:', classData);

    if (!classData.id) {
      this.classService.create(classData).subscribe({
        next: (response) => {
          console.log('✅ Clase creada en el backend:', response);
          this.cargarClases();
          this.selectedClass = undefined;
        },
        error: (err) => {
          console.error('❌ Error al crear la clase:', err);
        }
      });
    } else {
      this.classService.update(classData.id, classData).subscribe({
        next: () => {
          console.log('✅ Clase actualizada');
          this.cargarClases();
          this.selectedClass = undefined;
        },
        error: (err) => {
          console.error('❌ Error al actualizar la clase:', err);
        }
      });
    }
  }

  cancelarFormulario(): void {
    this.selectedClass = undefined;
  }
}
