import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageRentContactFormService } from 'src/app/shared/services/forms/package-rent-contact-form.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'package-rent-contact-form',
  templateUrl: './package-rent-contact-form.component.html',
  styleUrls: ['./package-rent-contact-form.component.scss']
})
export class PackageRentContactFormComponent implements OnInit{

  @Input() message: string = '';
  @Input() product: string = '';
  @Input() productType: string = '';
  isSubmitting = false;
  isSuccess = false;
  isError = false;

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private packageRentContactFormService: PackageRentContactFormService,
  ) {}

  ngOnInit(): void {
    this.packageRentContactForm.controls['message'].setValue(this.message);
  }

  public packageRentContactForm: FormGroup = this.formBuilder.group({
    companyName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(this.validatorsService.numberPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    message: [this.message, [Validators.required, Validators.maxLength(300)]],
  });

  isValidField(field: string): boolean|null {
    return this.validatorsService.isValidField(this.packageRentContactForm, field)
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.packageRentContactForm, field)
  }

  submitForm() {
    if (this.packageRentContactForm.invalid) {
      this.packageRentContactForm.markAllAsTouched();
      return;
    }
    const formData = this.packageRentContactForm.value;
    this.isSubmitting = true;
    this.packageRentContactFormService.submitForm(formData, this.product, this.productType).subscribe(
      () => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.packageRentContactForm.reset();
      },
      () => {
        this.isSubmitting = false;
        this.isError = true;
      }
    );
  }
}
