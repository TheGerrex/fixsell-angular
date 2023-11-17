import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {}

  showSuccess(title:string, message: string) {
    this.messageService.add({severity:'success', summary: title, detail: message, life: 8000});
  }
  showError(title:string, message: string) {
    this.messageService.add({severity: 'danger' , summary: title, detail: message, life: 8000});
  }
}
