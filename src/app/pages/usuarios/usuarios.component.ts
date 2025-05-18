import { Component, OnInit } from '@angular/core';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { UsuarioFormComponent } from './usuario-form.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, UsuarioFormComponent],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  selectedUser: Usuario | null = null;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  editarUsuario(user: Usuario) {
    this.selectedUser = { ...user };
  }

  eliminarUsuario(id: number) {
    this.usuariosService.delete(id).subscribe(() => this.cargarUsuarios());
  }

  guardarUsuario(usuario: Usuario) {
    if (usuario.id) {
      this.usuariosService.update(usuario.id, usuario).subscribe(() => this.cargarUsuarios());
    } else {
      this.usuariosService.create(usuario).subscribe(() => this.cargarUsuarios());
    }
    this.selectedUser = null;
  }

  nuevoUsuario() {
    this.selectedUser = { name: '', email: '', role: 'user' };
  }
}
