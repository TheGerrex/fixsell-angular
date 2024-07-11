import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Manager, Socket } from 'socket.io-client';
// import { ChatService } from '../../services/chat.service';
import {
  addListeners,
  connectToServerAsUser,
} from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
})
export class ChatboxComponent implements OnInit {
  isLiveChat: boolean = false;
  showChatbox = false;
  message!: string;
  messages: string[] = [];

  private socket: Socket | undefined;

  constructor() {}

  toggleChatbox(): void {
    this.showChatbox = !this.showChatbox;
    if (this.showChatbox && !this.socket) {
      this.connectAsUser();
    }
  }

  ngOnInit(): void {
    // this.chatService
    //   .getMessages()
    //   .subscribe((messageObj: { user: String; message: String }) => {
    //     this.messages.push(`${messageObj.user}: ${messageObj.message}`);
    //   });
  }

  sendMessage() {
    // this.chatService.sendMessage(this.message);
    this.message = '';
  }

  // ngOnDestroy(): void {
  //   this.socket?.close();
  // }

  @ViewChild('chatInput') chatInput!: ElementRef;

  adjustInputHeight() {
    this.chatInput.nativeElement.style.height = '30px';
    this.chatInput.nativeElement.style.height =
      this.chatInput.nativeElement.scrollHeight + 'px';
  }

  checkLiveChatAvailability() {}

  currentRoomName: string = ''; // Add this line
  chatHistory: any[] = [];
  clients: { id: string; roomName: string }[] = [];

  private getRoomNameFromCookies(): string | null {
    const cookies = document.cookie.split('; ');
    const roomNameCookie = cookies.find((row) => row.startsWith('roomName='));
    console.log('roomNameCookie', roomNameCookie);
    return roomNameCookie
      ? decodeURIComponent(roomNameCookie.split('=')[1])
      : null;
  }

  private handleChatHistory(chatHistory: any[]): void {
    this.chatHistory = chatHistory;
  }

  connectAsUser(): void {
    console.log('user connecting');
    const roomName = this.getRoomNameFromCookies();
    if (!this.socket) {
      this.socket = connectToServerAsUser();
      if (this.socket) {
        addListeners(
          this.socket,
          this.updateRoomName.bind(this),
          this.handleChatHistory.bind(this)
        );
      }
    }
  }

  private updateRoomName(roomName: string): void {
    this.currentRoomName = roomName;
    document.cookie = `roomName=${roomName};path=/;max-age=${
      30 * 24 * 60 * 60
    }`;
  }
  ngOnDestroy(): void {
    this.socket?.close();
  }
}
