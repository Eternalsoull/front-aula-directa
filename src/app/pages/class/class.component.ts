import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassService, Class } from '../../services/class.service';
import { ClassFormComponent } from './class-form.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  standalone: true,
  imports: [CommonModule, ClassFormComponent],
})
export class ClassComponent {
  classes: Class[] = [];
  selectedClass: Class | undefined = undefined;

  constructor(private classService: ClassService) {}

  cargarClases(): void {
    this.classService.getAll().subscribe(
      (data: Class[]) => { this.classes = data; },
      error => { console.error('❌ Error al obtener clases:', error); }
    );
  }

  nuevaClase() {
    this.selectedClass = { id: undefined, name: '' };
  }

  guardarClase(classData: Class) {
    console.log('📌 Datos antes de enviar al backend:', classData);

    if (!classData.id) {
      this.classService.create(classData).subscribe((response) => {
        console.log('✅ Clase creada en el backend:', response);
        this.cargarClases();
        this.selectedClass = undefined;
      }, error => {
        console.error('❌ Error al crear la clase:', error);
      });
    } else {
      this.classService.update(classData.id, classData).subscribe(() => {
        console.log('✅ Clase actualizada');
        this.cargarClases();
        this.selectedClass = undefined;
      });
    }
  }

  cancelarFormulario() {
    this.selectedClass = undefined;
  }
}
