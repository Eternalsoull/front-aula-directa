import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-listar-usuarios',
  imports: [CommonModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios = [
    { nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Administrador' },
    { nombre: 'Ana García', email: 'ana@example.com', rol: 'Docente' },
    { nombre: 'Luis Torres', email: 'luis@example.com', rol: 'Padre de familia' }
  ];

  constructor() {}

  ngOnInit(): void {}

  editarUsuario(usuario: any): void {
    console.log('Editar usuario:', usuario);
    
  }

  eliminarUsuario(usuario: any): void {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${usuario.nombre}?`);
    if (confirmacion) {
      this.usuarios = this.usuarios.filter(u => u !== usuario);
      console.log('Usuario eliminado:', usuario);
    }
  }

  crearUsuario(): void {
    console.log('Crear nuevo usuario');
    
  }
}
