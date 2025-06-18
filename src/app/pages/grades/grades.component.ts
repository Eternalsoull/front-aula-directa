import { Component, OnInit } from '@angular/core';
import { GradeService, Grade } from '../../services/grade.service';
import { CommonModule } from '@angular/common'; 


@Component({
  standalone: true, // 👈 esto indica que es standalone
  selector: 'app-grades',
  imports: [CommonModule], // 👈 agrega CommonModule aquí
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  grados: Grade[] = [];  // ✅ usa el tipo Grade

  constructor(private gradeService: GradeService) {}

  ngOnInit() {
    this.obtenerGrados();
  }

  obtenerGrados() {
    this.gradeService.getGrades().subscribe((data) => {
      this.grados = data;
    });
  }

  abrirFormulario() {
    // Aquí puedes redireccionar a un formulario o mostrar un modal
  }

  editarGrado(grado: Grade) {
    // Redireccionar al formulario con el ID del grado
    // Ejemplo: this.router.navigate(['/dashboard/grados/editar', grado.id]);
    console.log('Editar grado:', grado);
  }

  eliminarGrado(id: number) {
    this.gradeService.deleteGrade(id).subscribe(() => {
      this.obtenerGrados(); // Recarga la lista
    });
  }
}
