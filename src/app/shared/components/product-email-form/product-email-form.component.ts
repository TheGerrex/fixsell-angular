import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ValidatorsService } from '../../services/validators.service';
import { ProductContactFormService } from '../../services/forms/product-contact-form.service';
@Component({
  selector: 'product-email-form',
  templateUrl: './product-email-form.component.html',
  styleUrls: ['./product-email-form.component.scss'],
})
export class ProductEmailFormComponent {
  @Input() message: string = '';
  @Input() product: string = '';
  @Input() productType: string = '';
  isSubmitting = false;
  isSuccess = false;
  isError = false;
  leadId: number = 0; // Assign an initial value to leadId

  private readonly baseUrl: string = environment.baseUrl;

  public packageRentContactForm: FormGroup = this.formBuilder.group({
    companyName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(this.validatorsService.numberPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    message: [this.message, [Validators.required, Validators.maxLength(300)]],
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private productContactFormService: ProductContactFormService,
  ) {}

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
    this.productContactFormService.submitForm(formData, this.product, this.productType).subscribe(
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
