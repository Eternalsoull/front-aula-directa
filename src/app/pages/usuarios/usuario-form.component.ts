import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Usuario } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent implements OnInit {
  @Input() usuario: Usuario | null = null;
  @Output() guardar = new EventEmitter<Usuario>();

  form!: FormGroup;
  mostrarFormulario: boolean = false;
  selectedUser: any = null;


 cancelarFormulario() {
  this.selectedUser = null;
  this.mostrarFormulario = false;
}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  this.form = this.fb.group({
    id: [this.usuario?.id],  // ← AÑADE ESTO
    name: [this.usuario?.name || '', Validators.required],
    email: [this.usuario?.email || '', [Validators.required, Validators.email]],
    role: [this.usuario?.role || 'user', Validators.required],
    password: [this.usuario?.password || '', this.usuario?.id ? [] : Validators.required]
  });
}


  submitForm() {
  if (this.form.valid) {
    const formData = { ...this.form.value };

    if (!this.esNuevo) {
      delete formData.password;
    }

    this.guardar.emit(formData);  // ← el formData ya incluye el id
  } else {
    this.form.markAllAsTouched();
  }
}



  get esNuevo() {
  return !this.usuario?.id;
}

}
