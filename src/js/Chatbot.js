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
    function generateBotResponse(input) {
        input = input.toLowerCase();

        let responses = {
            "hello": "Hi there! How can I assist you today?",
            "who are you": "I'm an AI chatbot designed to entertain and assist you!",
            "what can you do": "I can chat with you, provide information, and guide you through the website!",
            "bye": "Goodbye! Come back soon!"
        };

        for (let key in responses) {
            if (input.includes(key)) {
                return responses[key];
            }
        }

        return "I'm not sure how to respond to that. Try asking me something else!";
    }

    // Event listeners
    sendMessageButton.addEventListener("click", handleUserMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            handleUserMessage();
        }
    });
});
