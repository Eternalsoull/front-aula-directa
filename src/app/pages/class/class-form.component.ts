import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Class } from '../../services/class.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ClassFormComponent {
  @Input() classData!: Class;
  @Output() guardar = new EventEmitter<Class>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.classData?.id],
      name: [this.classData?.name || '', [Validators.required, Validators.minLength(3)]],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.guardar.emit(this.form.value);  // ✅ Envía los datos correctamente al componente padre
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelarFormulario() {
    this.form.reset();
    this.cancelar.emit();  // ✅ Cancela el formulario correctamente
  }
  esNuevo: boolean = true; // O false, según tu lógica

}
