const messageList = document.getElementById("message-list");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("user-input");
const messageInput = document.getElementById("message-input");
const systemMessage = document.getElementById("system-message");
const roomInput = document.getElementById("room-input");
const joinButton = document.getElementById("join-button");
const leaveButton = document.getElementById("leave-button");
const sendButton = document.getElementById("send-button");
const statusUserCount = document.getElementById("status-user-count");
const notifyInput = document.getElementById("notify-input");
const notifyButton = document.getElementById("notify-button");

const socket = io("http://localhost:3000", {
  path: "/chat",
});

socket.on("connect", handleConnect);
socket.on("disconnect", handleDisconnect);
socket.on("connect_error", handleError);
socket.on("chat", handleChatMessage);
socket.on("join", handleJoinMessage);
socket.on("leave", handleLeaveMessage);
socket.on ("notify", handleNotifyAll);

messageForm.addEventListener("submit", sendChatMessage);
joinButton.addEventListener("click", sendJoinMessage);
leaveButton.addEventListener("click", sendLeaveMessage);
notifyButton.addEventListener("click", notifyAll);

function notifyAll() {
  const message = notifyInput.value.trim();
  if (!message) return;
  socket.emit("notifyAll", { message });
  notifyInput.value = "";
}

function createMessageItem({ type, payload }) {
  const li = document.createElement("li"); // list tag 하는 부분
  li.classList.add("message-item");

  switch (type) {
    case "chat":
      if (payload.user === userInput.value) {
        li.classList.add("me");
      }
      li.textContent = `${payload.user}: ${payload.message}`;
      break;
    case "join":
      li.textContent = `[시스템] ${payload.user}님이 ${payload.room} 채팅방에 참여했습니다.`;
      break;
    case "leave":
      li.textContent = `[시스템] ${payload.user}님이 ${payload.room} 채팅방에서 나갔습니다.`;
      break;
    default:
      console.error("Invalid message type", type);
      break;
  }
  messageList.appendChild(li);
}

function handleConnect() {
  systemMessage.textContent =
    "Socket.IO 연결이 성공했습니다. (서버가 /chat 경로에서 수신 중)";
  console.log("Connected to Socket.IO server");
}

function handleDisconnect() {
  systemMessage.textContent = "Socket.IO 연결이 종료되었습니다.";
}

function handleError(error) {
  systemMessage.textContent = "Socket.IO 연결 중 오류가 발생했습니다.";
  console.error("Connection error:", error);
}

function handleChatMessage(message) {
  createMessageItem({ type: "chat", payload: message });
}

function handleJoinMessage(message) {
  createMessageItem({ type: "join", payload: message });
}

function handleLeaveMessage(message) {
  createMessageItem({ type: "leave", payload: message });
}

function handleNotifyAll(message) {
  const li = document.createElement("li");
  li.classList.add("notify-item");
  li.textContent = `[공지] ${message}`;
  messageList.appendChild(li);
}

function sendChatMessage(event) {
  event.preventDefault();
  const user = userInput.value;
  const message = messageInput.value;
  try {
    socket.emit("chat", { user, message, room: roomInput.value });
    messageInput.value = "";
  } catch (error) {
    systemMessage.textContent = "메시지 전송 중 오류가 발생했습니다.";
    console.error("Send error:", error);
  }
}

function sendJoinMessage() {
  socket.emit("join", { user: userInput.value, room: roomInput.value });
  setStatus("join");
}

function sendLeaveMessage() {
  socket.emit("leave", { user: userInput.value, room: roomInput.value });
  setStatus("leave");
}

function setStatus(status) {
  switch (status) {
    case "join":
      leaveButton.disabled = false;
      sendButton.disabled = false;
      joinButton.disabled = true;
      userInput.disabled = true;
      roomInput.disabled = true;
      break;
    case "leave":
    default:
      leaveButton.disabled = true;
      sendButton.disabled = true;
      joinButton.disabled = false;
      userInput.disabled = false;
      roomInput.disabled = false;
      break;
  }
}

function randomizeUser() {
  const num = Math.floor(Math.random() * 100);
  userInput.value = `user${num}`;
}

function randomizeRoom() {
  const num = Math.floor(Math.random() * 100);
  roomInput.value = `room${num}`;
}

randomizeUser();
randomizeRoom();
setStatus("leave");

const statusSocket = io("http://localhost:3000/status", {
  path: "/chat",
});

statusSocket.on("userCount", (message) => {
  const { userCount } = message;
  statusUserCount.textContent = userCount;
});
