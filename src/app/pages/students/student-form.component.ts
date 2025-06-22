import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../services/student.service';
import { Grade } from '../../services/grade.service';
import { Parent } from '../../services/parent.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent implements OnInit {
  @Input() studentData!: Student;
  @Input() grades: Grade[] = [];
  @Input() parents: Parent[] = [];

  @Output() guardar = new EventEmitter<Student>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.studentData?.id],
      name: [this.studentData?.name || '', Validators.required],
      grade_id: [this.studentData?.grade_id || '', Validators.required],
      parent_id: [this.studentData?.parent_id || '', Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      const data = { ...this.form.value };
      this.guardar.emit(data);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelarFormulario() {
    this.form.reset();
    this.cancelar.emit();
  }

  get esNuevo(): boolean {
    return !this.studentData?.id;
  }
}
