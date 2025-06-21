// src/app/pages/grades/grade-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Grade } from '../../../services/grade.service';

@Component({
  selector: 'app-grade-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grade-form.component.html'
})
export class GradeFormComponent {
  @Input() gradeData!: Grade;
  @Output() guardar = new EventEmitter<Grade>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.gradeData?.id],
      name: [this.gradeData?.name || '', [Validators.required, Validators.minLength(3)]],
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      this.guardar.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelarFormulario(): void {
    this.form.reset();
    this.cancelar.emit();
  }

  esNuevo: boolean = true;
}