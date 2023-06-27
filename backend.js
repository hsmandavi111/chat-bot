// Get DOM elements
const chatIcon = document.getElementById("chat-icon");
const chatWindow = document.getElementById("chat-window");
const closeButton = document.getElementById("close-button");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");
const messageContainer = document.getElementById("message-container")


// Toggle chat window visibility
function toggleChatWindow() {
    chatIcon.style.display = 'none'; // Hide the chat icon
    chatWindow.style.display = 'block'; // Show the chat window
  
    // chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
  }
  
  // Close chat window
  function closeChatWindow() {
    chatWindow.style.display = 'none';
    chatIcon.style.display = 'block';
  }

// Handle send button click event
async function handleSendButtonClick() {
  const message = messageInput.value;
  const data = {
    text: messageInput.value,
  };
  
  if (message.trim() !== "") {
    // displayMessage("USER");
    displayMessage(message,"USER");
    messageInput.value = "";


    fetch("http://localhost:5000/dialogflow/rest/text", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((result) => {
    // displayMessage("GPT");
  displayMessage(result.text,"BOT");
    // Do something with the response from the server
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  

  }
}

// Display a new message
function displayMessage(message,role) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  
  // messageElement.classList.add("message-container");
  if (role === "USER") {
    messageElement.classList.add("user-message");
  } else if (role === "BOT") {
    messageElement.classList.add("bot-message");
  }
  

  // messageContainer.appendChild(messageElement);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;


}

// Attach event listeners
chatIcon.addEventListener("click", toggleChatWindow);
closeButton.addEventListener("click", closeChatWindow);
sendButton.addEventListener("click", handleSendButtonClick);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSendButtonClick();
  }
});
