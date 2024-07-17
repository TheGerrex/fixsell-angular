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
    this.currentRoomName = this.getRoomNameFromCookies() || '';
    this.currentState = this.getCurrentStateFromCookies() || '';
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
  currentState: string = ''; // Add this line
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

  private getCurrentStateFromCookies(): string | null {
    const cookies = document.cookie.split('; ');
    const currentStateCookie = cookies.find((row) =>
      row.startsWith('chatState')
    );
    console.log('currentStateCookie', currentStateCookie);
    return currentStateCookie
      ? decodeURIComponent(currentStateCookie.split('=')[1])
      : null;
  }

  private handleChatHistory(chatHistory: any[]): void {
    this.chatHistory = chatHistory;
  }

  connectAsUser(): void {
    if (!this.socket) {
      console.log('Connecting as user with room name:', this.currentRoomName);
      console.log('Connecting as user with state:', this.currentState);
      this.socket = connectToServerAsUser(
        this.currentRoomName,
        this.currentState
      );
      if (this.socket) {
        addListeners(
          this.socket,
          this.updateRoomName.bind(this),
          this.handleChatHistory.bind(this)
        );

        // Listen for messages from the server
        this.socket.on('message-from-server', (message: any) => {
          console.log('Received message from server:', message);
          this.chatHistory.push(message);
          // Update your UI here
        });

        // Request chat history if we have a room name
        if (this.currentRoomName) {
          this.socket.emit('getChatHistory', this.currentRoomName);
        }
      }
    }
  }

  private updateRoomName(roomName: string): void {
    // Parse cookies into an object
    // Define the accumulator's type to allow string indexing
    const cookies = document.cookie
      .split('; ')
      .reduce((acc: { [key: string]: string }, current) => {
        const [key, value] = current.split('=');
        acc[key] = value;
        return acc;
      }, {});

    // Check if the roomName cookie exists and has the same value
    if (cookies['roomName'] !== roomName) {
      this.currentRoomName = roomName;
      document.cookie = `roomName=${roomName};path=/;max-age=${
        30 * 24 * 60 * 60
      }`;
    }
  }
  ngOnDestroy(): void {
    this.socket?.close();
  }
}
