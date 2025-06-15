import { Component, OnInit } from '@angular/core';
import { ClassService, Class } from '../../services/class.service';  

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html', 
})
export class ClassComponent implements OnInit {
  classes: Class[] = [];
  selectedClass: Class | undefined = undefined;  // ✅ Se inicia correctamente

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases(): void {
    this.classService.getAll().subscribe(
      (data: Class[]) => {  
        console.log('✅ Datos recibidos:', data);
        this.classes = data;
      },
      error => {
        console.error('❌ Error al cargar clases:', error);
        this.classes = [];
      }
    );
  }

  editarClase(classItem: Class) {
    this.selectedClass = { ...classItem };
  }

  eliminarClase(id: number) {
    this.classService.delete(id).subscribe(() => this.cargarClases());
  }

  guardarClase(classData: Class) {
    if (classData.id) {
      this.classService.update(classData.id, classData).subscribe(() => this.cargarClases());
    } else {
      this.classService.create(classData).subscribe(() => this.cargarClases());
    }
    this.selectedClass = undefined;  // ✅ Asegura
    //  que el formulario se cierre al guardar
  }

  nuevaClase() {
  this.selectedClass = { id: undefined, name: '' }; 
}
}
