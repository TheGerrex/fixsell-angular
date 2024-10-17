import { Manager, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';

export const showForm = new EventEmitter<boolean>();

// For Admin Connection
export const connectToServerAsAdmin = (roomName: string) => {
  console.log('connecting as admin...');
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found. Please login.');
    return;
  }

  const manager = new Manager(`${environment.baseUrl}/socket.io/socket.io.js`, {
    extraHeaders: {
      authentication: token,
    },
  });

  const socket = manager.socket('/', {
    auth: {
      token,
      role: 'admin', // Identify role
      roomName,
    },
  });

  return socket;
};

// For User Connection
export const connectToServerAsUser = (
  roomName?: string,
  savedState?: string
) => {
  console.log('connecting as user...');

  const manager = new Manager(
    `${environment.baseUrl}/socket.io/socket.io.js`, // Use environment base URL
    {}
  );

  const socket = manager.socket('/', {
    auth: {
      role: 'user',
      roomName,
      savedState,
    },
  });

  // Handle chat state updates
  socket.on('chatState', (state: string) => {
    setCookie('chatState', state); // Update the chatState cookie whenever a new state is received
  });

  return socket;
};

export const addListeners = (
  socket: Socket,
  onRoomJoined: (roomName: string) => void,
  onChatHistoryReceived: (chatHistory: any[]) => void
) => {
  // Element selectors
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesList = document.querySelector<HTMLDivElement>('#messages-list')!;
  const messageSendButton = document.querySelector<HTMLButtonElement>('#message-send')!;

  // Current room name storage, made mutable by wrapping in an object
  let roomState = { currentRoomName: '' };

  // Socket event listeners
  setupSocketListeners(socket, messagesList, onRoomJoined, roomState);

  // Form submission listener
  setupFormListener(messageForm, messageInput, messageSendButton, socket, roomState);

  // Handle chat history event
  socket.on('chatHistory', (chatHistory) => {
    console.log('Received chat history:', chatHistory);
    onChatHistoryReceived(chatHistory); // Call the callback with the chat history
    // Clear existing messages
    messagesList.innerHTML = '';

    // Iterate over chat history and display each message
    chatHistory.forEach((chatHistoryItem: { senderId: any; message: any, timestamp: any, messageType: any, formData: any }) => {
      const messageSection = document.createElement('section');
      messageSection.classList.add('message');

      const messageContentDiv = document.createElement('div');
      messageContentDiv.classList.add('message-content');

      if (chatHistoryItem.senderId === 'Fixy' || chatHistoryItem.senderId === 'Employee') {
        messageSection.classList.add('admin-message');
      } else {
        messageSection.classList.add('user-message');
      }

      if (chatHistoryItem.senderId === 'Fixy') {
        const avatarImg = document.createElement('img');
        avatarImg.src = "https://fixsell-website-images.s3.amazonaws.com/fixsell-logos/fixsell-logo-small.svg"; // Assuming avatarUrl is a property in chatHistoryItem
        avatarImg.alt = `${chatHistoryItem.senderId}'s avatar`;
        avatarImg.classList.add('avatar');
        messageSection.appendChild(avatarImg);
      }

      if (chatHistoryItem.messageType === 'form') {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('lead-success');

        if (chatHistoryItem.senderId === 'Fixy') {
          const senderH5 = document.createElement('h5');
          senderH5.textContent = chatHistoryItem.senderId;
          senderH5.style.fontWeight = '500';
          senderH5.style.color = '#4b5563';
          senderH5.style.fontSize = '15px';
          senderH5.style.marginLeft = '.25rem';
          messageContentDiv.appendChild(senderH5);
        }

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('lead-form-item');
        const nameLabel = document.createElement('p');
        nameLabel.classList.add('lead-form-item-label');
        nameLabel.textContent = 'Nombre o Empresa';
        const nameData = document.createElement('p');
        nameData.classList.add('lead-form-item-data');
        nameData.textContent = chatHistoryItem.formData.name;
        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameData);
        cardDiv.appendChild(nameDiv);

        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('lead-form-item');
        const phoneLabel = document.createElement('p');
        phoneLabel.classList.add('lead-form-item-label');
        phoneLabel.textContent = 'Teléfono';
        const phoneData = document.createElement('p');
        phoneData.classList.add('lead-form-item-data');
        phoneData.textContent = chatHistoryItem.formData.phone;
        phoneDiv.appendChild(phoneLabel);
        phoneDiv.appendChild(phoneData);
        cardDiv.appendChild(phoneDiv);

        const emailDiv = document.createElement('div');
        emailDiv.classList.add('lead-form-item');
        const emailLabel = document.createElement('p');
        emailLabel.classList.add('lead-form-item-label');
        emailLabel.textContent = 'Email';
        const emailData = document.createElement('p');
        emailData.classList.add('lead-form-item-data');
        emailData.textContent = chatHistoryItem.formData.email;
        emailDiv.appendChild(emailLabel);
        emailDiv.appendChild(emailData);
        cardDiv.appendChild(emailDiv);

        messageContentDiv.appendChild(cardDiv);
      } else {
        // ... Rest of the code ...
        if (chatHistoryItem.senderId === 'Fixy') {
          const senderH5 = document.createElement('h5');
          senderH5.textContent = chatHistoryItem.senderId;
          senderH5.style.fontWeight = '500';
          senderH5.style.color = '#4b5563';
          senderH5.style.fontSize = '15px';
          senderH5.style.marginLeft = '.25rem';
          messageContentDiv.appendChild(senderH5);
        }

        const messageBlobDiv = document.createElement('div');
        messageBlobDiv.classList.add('message-blob');

        if (chatHistoryItem.senderId === 'Fixy' || chatHistoryItem.senderId === 'Employee') {
          messageBlobDiv.classList.add('admin-blob');
        } else {
          messageBlobDiv.classList.add('user-blob');
        }

        const messageP = document.createElement('p');
        messageP.textContent = chatHistoryItem.message;
        messageBlobDiv.appendChild(messageP);

        const timestampTime = document.createElement('time');
        timestampTime.classList.add('message-time');
        timestampTime.textContent = new Date(chatHistoryItem.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit' });

        if (chatHistoryItem.senderId === 'Fixy' || chatHistoryItem.senderId === 'Employee') {
          timestampTime.classList.add('admin-message-time');
        } else {
          timestampTime.classList.add('user-message-time');
        }
        messageBlobDiv.appendChild(timestampTime);

        messageContentDiv.appendChild(messageBlobDiv);
      }


      messageSection.appendChild(messageContentDiv);
      messagesList.appendChild(messageSection);

      // Scroll to the latest message
      setTimeout(() => {
        messageSection.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    });
  });

  socket.on('show-form', () => {
    showForm.emit(true);
  });

};

function setupSocketListeners(
  socket: Socket,
  messagesList: HTMLDivElement,
  onRoomJoined: (roomName: string) => void,
  roomState: { currentRoomName: string }
) {
  socket.on(
    'message-from-server',
    (payload: { FullName: string; Message: string; RoomName: string }) => {
      console.log('received message from server');
      console.log(`message from server: ${JSON.stringify(payload)}`);
      if (payload.RoomName === roomState.currentRoomName) {
        console.log(`Confirmed same room - message from server: ${JSON.stringify(payload)}`);

        const messageSection = document.createElement('section');
        messageSection.classList.add('message');

        if (payload.FullName === 'Fixy' || payload.FullName === 'Employee') {
          messageSection.classList.add('admin-message');
          messageSection.classList.add('fade-in');
        } else {
          messageSection.classList.add('user-message');
          messageSection.classList.add('fade-in');
        }

        if (payload.FullName === 'Fixy' || payload.FullName === 'Employee') {
          const avatarImg = document.createElement('img');
          avatarImg.src = "https://fixsell-website-images.s3.amazonaws.com/fixsell-logos/fixsell-logo-small.svg"; // Assuming avatarUrl is a property in chatHistoryItem
          avatarImg.alt = `${payload.FullName}'s avatar`;
          avatarImg.classList.add('avatar');
          messageSection.appendChild(avatarImg);
        }


        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');

        const messageBlobDiv = document.createElement('div');
        messageBlobDiv.classList.add('message-blob');

        if (payload.FullName === 'Fixy' || payload.FullName === 'Employee') {
          messageBlobDiv.classList.add('admin-blob');
        } else {
          messageBlobDiv.classList.add('user-blob');
        }

        const messageP = document.createElement('p');
        messageP.textContent = payload.Message;
        messageBlobDiv.appendChild(messageP);

        const timestampTime = document.createElement('time');
        timestampTime.classList.add('message-time');
        timestampTime.textContent = new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' });

        if (payload.FullName === 'Fixy' || payload.FullName === 'Employee') {
          timestampTime.classList.add('admin-message-time');
        } else {
          timestampTime.classList.add('user-message-time');
        }

        messageBlobDiv.appendChild(timestampTime);

        messageContentDiv.appendChild(messageBlobDiv);
        messageSection.appendChild(messageContentDiv);
        messagesList.appendChild(messageSection);

        // Scroll to the latest message
        setTimeout(() => {
          messageSection.scrollIntoView({ behavior: 'smooth' });
        }, 0);

      }
    }
  );

  socket.on('room-joined', (roomName: string) => {
    console.log(`Joined room: ${roomName}`);
    roomState.currentRoomName = roomName; // Update the current room name
    onRoomJoined(roomName);
    setCookie('roomName', roomName);
  });

  socket.on('chatState', (state: string) => {
    setCookie('chatState', state);
  });
}

function setupFormListener(
  messageForm: HTMLFormElement,
  messageInput: HTMLInputElement,
  messageSendButton: HTMLButtonElement,
  socket: Socket,
  roomState: { currentRoomName: string }
) {
  const sendMessage = () => {
    if (messageInput.value.trim().length <= 0) return;

    // Include the current room name in the message payload
    socket.emit('message-from-client', {
      id: socket.id,
      message: messageInput.value,
      timestamp: new Date(),
      roomName: roomState.currentRoomName, // Use the current room name
    });
    console.log('Sending message:', messageInput.value);
    messageInput.value = '';
  };

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessage();
  });

  // Send Button listener
  if (messageSendButton) {
    messageSendButton.addEventListener('click', (event) => {
      event.preventDefault();
      sendMessage();
    });
  } else {
    console.error('Send button not found');
  }
}

// Utility functions for cookie handling
function getCookie(name: string): string | null {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((cookie) => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map((cookie) => decodeURIComponent(cookie.substring(nameLenPlus)))[0] ||
    null
  );
}

function setCookie(name: string, value: string, days = 30): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}
