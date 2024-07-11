import { Manager, Socket } from 'socket.io-client';

// For User Connection
export const connectToServerAsUser = () => {
  console.log('connecting as user...');

  const manager = new Manager(
    'http://localhost:3000/socket.io/socket.io.js',
    {}
  );

  const socket = manager.socket('/', {
    auth: {
      role: 'user', // Identify role
    },
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
  const messageInput =
    document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

  // Current room name storage, made mutable by wrapping in an object
  let roomState = { currentRoomName: '' };

  // Socket event listeners
  setupSocketListeners(socket, messagesUl, onRoomJoined, roomState);

  // Form submission listener
  setupFormListener(messageForm, messageInput, socket, roomState);

  // Handle chat history event
  socket.on('chatHistory', (chatHistory) => {
    console.log('Received chat history:', chatHistory);
    onChatHistoryReceived(chatHistory); // Call the callback with the chat history
    // Clear existing messages
    messagesUl.innerHTML = '';
    // Iterate over chat history and display each message
    chatHistory.forEach((chatHistoryItem: { senderId: any; message: any }) => {
      const messageLi = document.createElement('li');
      // Format the message as "senderId: Message"
      messageLi.textContent = `${chatHistoryItem.senderId}: ${chatHistoryItem.message}`;
      messagesUl.appendChild(messageLi);
    });
  });
};

function setupSocketListeners(
  socket: Socket,
  messagesUl: HTMLUListElement,
  onRoomJoined: (roomName: string) => void,
  roomState: { currentRoomName: string }
) {
  socket.on(
    'message-from-server',
    (payload: { FullName: string; Message: string; RoomName: string }) => {
      console.log('recievd message from server');
      console.log(`message from server: ${JSON.stringify(payload)}`);
      // Only display messages from the current room
      console.log('payload roomname:', payload.RoomName);
      console.log('roomstate.currentroomname:', roomState.currentRoomName);
      console.log('payload:', payload);
      if (payload.RoomName === roomState.currentRoomName) {
        console.log(`message from server: ${JSON.stringify(payload)}`);
        const li = document.createElement('li');
        li.textContent = `${payload.FullName}: ${payload.Message}`;
        messagesUl.appendChild(li);
      }
    }
  );

  socket.on('room-joined', (roomName: string) => {
    console.log(`Joined room: ${roomName}`);
    roomState.currentRoomName = roomName; // Update the current room name
    onRoomJoined(roomName);
  });
}

function setupFormListener(
  messageForm: HTMLFormElement,
  messageInput: HTMLInputElement,
  socket: Socket,
  roomState: { currentRoomName: string }
) {
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
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
  });
}
