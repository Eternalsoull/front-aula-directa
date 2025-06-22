import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { UsuarioFormComponent } from './usuario-form.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, UsuarioFormComponent],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  selectedUser: Usuario | undefined = undefined;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  nuevoUsuario(): void {
    this.selectedUser = { id: undefined, name: '', email: '', role: 'user', password: '' };
  }

  editarUsuario(user: Usuario): void {
    this.selectedUser = { ...user };
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuariosService.delete(id).subscribe(() => this.cargarUsuarios());
    }
  }

  guardarUsuario(usuario: Usuario): void {
    if (!usuario.id) {
      this.usuariosService.create(usuario).subscribe(() => {
        this.cargarUsuarios();
        this.selectedUser = undefined;
      });
    } else {
      this.usuariosService.update(usuario.id, usuario).subscribe(() => {
        this.cargarUsuarios();
        this.selectedUser = undefined;
      });
    }
  }

  cancelarFormulario(): void {
    this.selectedUser = undefined;
  }
}
