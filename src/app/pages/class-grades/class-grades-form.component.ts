import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassGrade } from '../../services/class-grade.service';
import { Class } from '../../services/class.service';
import { Grade } from '../../services/grade.service';
import { Teacher } from '../../services/teacher.service';

@Component({
  selector: 'app-class-grades-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './class-grades-form.component.html'
})
export class ClassGradesFormComponent implements OnInit {
  @Input() relation!: ClassGrade;
  @Input() classes: Class[] = [];
  @Input() grades: Grade[] = [];
  @Input() teachers: Teacher[] = [];

  @Output() guardar = new EventEmitter<ClassGrade>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.relation?.id],
      class_id: [this.relation?.class_id || '', Validators.required],
      grade_id: [this.relation?.grade_id || '', Validators.required],
      teacher_id: [this.relation?.teacher_id || '', Validators.required]
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.guardar.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelarFormulario() {
    this.form.reset();
    this.cancelar.emit();
  }
}
