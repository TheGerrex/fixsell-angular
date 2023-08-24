import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from '../services/contact-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private contactFormService: ContactFormService, private router: Router) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.contactFormService.submitForm(formData).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
          this.router.navigate(['/success']);

        },
        (error) => {
          console.error('Error sending email:', error);
          // Handle error behavior (e.g., show an error message)
        }
      );
    }
  }
}
