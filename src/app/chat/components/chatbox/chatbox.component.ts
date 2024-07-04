import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'socket.io-client';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  isLiveChat: boolean = false;
  showChatbox = false;
  message!: string;
  messages: string[] = []

  private socket: Socket | undefined;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((messageObj: { user: String; message: String; }) => {
      this.messages.push(`${messageObj.user}: ${messageObj.message}`);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  // ngOnDestroy(): void {
  //   this.socket?.close();
  // }

  @ViewChild('chatInput') chatInput!: ElementRef;

  adjustInputHeight() {
    this.chatInput.nativeElement.style.height = '30px';
    this.chatInput.nativeElement.style.height = this.chatInput.nativeElement.scrollHeight + 'px';
  }

  checkLiveChatAvailability() {
  }

}
