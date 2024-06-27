import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  isLiveChat: boolean = false;
  showChatbox = false;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  checkLiveChatAvailability() {
  }

}
