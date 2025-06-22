import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Usuario } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent implements OnInit {
  @Input() usuario!: Usuario;
  @Output() guardar = new EventEmitter<Usuario>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.usuario?.id],
      name: [this.usuario?.name || '', Validators.required],
      email: [this.usuario?.email || '', [Validators.required, Validators.email]],
      role: [this.usuario?.role || 'user', Validators.required],
      password: [this.usuario?.password || '', this.usuario?.id ? [] : Validators.required]
    });
  }

  submitForm() {
    if (this.form.valid) {
      const data = { ...this.form.value };

      if (!this.esNuevo) {
        delete data.password; // No enviamos la contraseña si estamos editando
      }

      this.guardar.emit(data);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelarFormulario() {
    this.form.reset();
    this.cancelar.emit(); // ✅ Emitimos cancelar al padre
  }

  get esNuevo() {
    return !this.usuario?.id;
  }
}
