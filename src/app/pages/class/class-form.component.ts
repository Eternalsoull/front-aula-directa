import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Class } from '../../services/class.service'; 

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
})
export class ClassFormComponent implements OnInit {
  @Input() classData: Class | null = null;
  @Output() guardar = new EventEmitter<Class>();
  
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.classData?.id],
      name: [this.classData?.name || '', Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.guardar.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
