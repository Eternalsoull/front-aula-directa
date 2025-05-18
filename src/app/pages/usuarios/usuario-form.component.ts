import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent {
  @Input() usuario!: Usuario;
  @Output() guardar = new EventEmitter<Usuario>();

  guardarUsuario() {
    this.guardar.emit(this.usuario);
  }
}
