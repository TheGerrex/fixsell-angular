import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from 'src/app/shared/services/forms/contact-form.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  // public contactForm: FormGroup = this.formBuilder.group({
  //   name: ['', Validators.required],
  //   phone: ['', [Validators.required, Validators.pattern(this.validatorsService.numberPattern)]],
  //   email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
  //   message: ['', [Validators.required, Validators.maxLength(300)]],
  // });

  constructor(
    private formBuilder: FormBuilder,
    private contactFormService: ContactFormService,
    private validatorsService: ValidatorsService,
  ) {
  }

  // isValidField(field: string): boolean | null {
  //   return this.validatorsService.isValidField(this.contactForm, field)
  //   // return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  // }

  // getFieldError(field: string): string | null {
  //   if (!this.contactForm.controls[field]) return null;

  //   const errors = this.contactForm.controls[field].errors || {};

  //   for (const key of Object.keys(errors)) {
  //     switch (key) {
  //       case 'required':
  //         return 'Este campo es requerido';
  //       case 'pattern':
  //         return 'Este campo esta en formato incorrecto';
  //       case 'maxlength':
  //         return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
  //     }
  //   }
  //   return null;
  // }

  // submitForm() {
  //   if (this.contactForm.invalid) {
  //     this.contactForm.markAllAsTouched();
  //     return;
  //   }
  //   const formData = this.contactForm.value;
  //   // console.log(formData);
  //   this.contactFormService.submitForm(formData);
  //   this.contactForm.reset();
  // }
}
