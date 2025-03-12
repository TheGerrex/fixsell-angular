import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  leadId: number = 0;

  private readonly baseUrl: string = environment.baseUrl;

  public productContactForm: FormGroup = this.formBuilder.group({
    companyName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(this.validatorsService.numberPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    message: [this.message, [Validators.required, Validators.maxLength(300)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private productContactFormService: ProductContactFormService,
    private cdr: ChangeDetectorRef,
  ) { }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.productContactForm, field)
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.productContactForm, field)
  }

  submitForm() {
    if (this.productContactForm.invalid) {
      this.productContactForm.markAllAsTouched();
      return;
    }
    const formData = this.productContactForm.value;
    this.isSubmitting = true;
    this.productContactFormService.submitForm(formData, this.product, this.productType).subscribe(
      () => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.cdr.detectChanges();
      },
      () => {
        this.isSubmitting = false;
        this.isError = true;
        this.cdr.detectChanges();
      }
    );
  }

  reloadForm() {
    this.isSuccess = false;
    this.productContactForm.reset();
  }

  retryForm() {
    this.isError = false;
  }
}
