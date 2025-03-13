document.addEventListener("DOMContentLoaded", function () {
    // Create chatbot container
    let chatbotContainer = document.createElement("div");
    chatbotContainer.id = "chatbot-container";
    chatbotContainer.innerHTML = `
        <div id="chatbot-header">AI Chatbot <span id="close-chatbot">&times;</span></div>
        <div id="chatbot-body">
            <div id="chatbot-messages"></div>
        </div>
        <div id="chatbot-input">
            <input type="text" id="user-input" placeholder="Ask me something...">
            <button id="send-message">Send</button>
        </div>
    `;

    document.body.appendChild(chatbotContainer);

    // Handle chatbot visibility
    document.getElementById("close-chatbot").addEventListener("click", function () {
        chatbotContainer.style.display = "none";
    });

    let chatbotMessages = document.getElementById("chatbot-messages");
    let userInput = document.getElementById("user-input");
    let sendMessageButton = document.getElementById("send-message");

    // Function to append messages
    function appendMessage(sender, text) {
        let messageElement = document.createElement("div");
        messageElement.classList.add(sender);
        messageElement.innerHTML = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Initial bot greeting
    appendMessage("bot", "Hello! I'm your AI companion. Ask me anything!");

    // Function to handle user input
    function handleUserMessage() {
        let userText = userInput.value.trim();
        if (userText === "") return;

        appendMessage("user", userText);
        userInput.value = "";

        setTimeout(() => {
            let botResponse = generateBotResponse(userText);
            appendMessage("bot", botResponse);
        }, 1000);
    }

    // Bot response logic
    async function generateBotResponse(input) {
        const response = await fetch("/.netlify/functions/fetchResponse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input })
        });
    
        const data = await response.json();
        return data.reply || "I'm not sure how to respond to that.";
    }
    // Event listeners
    sendMessageButton.addEventListener("click", handleUserMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            handleUserMessage();
        }
    });
});
