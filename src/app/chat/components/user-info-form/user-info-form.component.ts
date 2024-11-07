import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss']
})
export class UserInfoFormComponent {
  @Output() formSubmitted = new EventEmitter<{ name: string; email: string; phone: string }>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmitted.emit(form.value);
    }
  }
}
