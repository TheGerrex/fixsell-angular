import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
// import { ChatService } from './services/chat.service';
// import { ChatbotService } from './services/chatbot.service';
import { LiveChatService } from './services/live-chat.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatboxComponent, ChatbotComponent, LiveChatComponent],
  imports: [CommonModule, FormsModule],
  providers: [LiveChatService],
  exports: [ChatboxComponent],
})
export class ChatModule {}
