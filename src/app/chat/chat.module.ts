import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { LiveChatService } from './services/live-chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadFormComponent } from './components/lead-form/lead-form.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [ChatboxComponent, ChatbotComponent, LiveChatComponent, LeadFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [LiveChatService, provideNgxMask()],
  exports: [ChatboxComponent],
})
export class ChatModule { }
