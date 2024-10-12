import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'chat-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss']
})
export class LeadFormComponent {
  @Output() leadCreated = new EventEmitter<{ name: string, phone: string, email: string }>();
  currentStep = 1;
  isLoading = false;
  isSuccess = false;
  submittedData: any;

  leadForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(this.validatorsService.numberPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.leadForm, field)
    // return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.leadForm.controls[field as keyof typeof this.leadForm.controls]) return null;

    const errors = this.leadForm.controls[field as keyof typeof this.leadForm.controls].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'pattern':
          return 'Este campo esta en formato incorrecto';
        case 'maxlength':
          return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  get currentField(): string {
    switch (this.currentStep) {
      case 1: return 'name';
      case 2: return 'phone';
      case 3: return 'email';
    }
    return '';
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  onSubmit() {
    if (this.leadForm.valid) {
      const { name, phone, email } = this.leadForm.value;
      if (name && phone && email) {
        this.isLoading = true;
        // Simulate an API call
        setTimeout(() => {
          this.leadCreated.emit({ name, phone, email });
          this.submittedData = { name, phone, email };
          this.leadForm.reset();
          this.isLoading = false;
          this.isSuccess = true;
        }, 2000);
      }
    }
  }

  // onSubmit() {
  //   if (this.leadForm.valid) {
  //     const { name, phone, email } = this.leadForm.value;
  //     if (name && phone && email) {
  //       this.leadCreated.emit({ name, phone, email });
  //       this.leadForm.reset();
  //     }
  //   }
  // }
}