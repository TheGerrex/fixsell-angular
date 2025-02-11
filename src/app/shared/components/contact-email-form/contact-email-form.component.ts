import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { ContactFormService } from '../../services/forms/contact-form.service';

@Component({
  selector: 'contact-email-form',
  templateUrl: './contact-email-form.component.html',
  styleUrls: ['./contact-email-form.component.scss']
})
export class ContactEmailFormComponent {
  @Input() message: string = '';
  @Input() product: string = '';
  @Input() productType: string = '';
  isSubmitting = false;
  isSuccess = false;
  isError = false;
  leadId: number = 0; // Assign an initial value to leadId

  public contactForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(this.validatorsService.numberPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    message: [this.message, [Validators.required, Validators.maxLength(300)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private contactFormService: ContactFormService,
  ) { }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.contactForm, field)
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.contactForm, field)
  }

  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }


    const formData = this.contactForm.value;
    this.isSubmitting = true;
    console.log('formData', formData);
    this.contactFormService.submit(formData).subscribe(
      () => {
        this.isSubmitting = false;
        this.isSuccess = true;
      },
      () => {
        this.isSubmitting = false;
        this.isError = true;
      }
    );
  }

  reloadForm() {
    this.isSuccess = false;
    this.contactForm.reset();
  }

  retryForm() {
    this.isError = false;
  }
}
