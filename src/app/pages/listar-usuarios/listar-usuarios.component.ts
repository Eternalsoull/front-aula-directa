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
    // Aquí podrías usar el router para ir a una vista de edición
  }

  crearUsuario(): void {
    console.log('Crear nuevo usuario');
    // Aquí podrías redirigir a un formulario vacío o abrir un modal
  }
}
