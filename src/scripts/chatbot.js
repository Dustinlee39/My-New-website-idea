// Chatbot.js - Handles simple user interactions with the chatbot

const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const voiceBtn = document.getElementById('voiceBtn');

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage('user', userMessage);
            getChatResponse(userMessage);
            chatInput.value = '';
        }
    }
});

voiceBtn.addEventListener('click', () => {
    startVoiceRecognition();
});

function addMessage(sender, message) {
    const messageElem = document.createElement('div');
    messageElem.className = `${sender}-message`;
    messageElem.textContent = message;
    chatMessages.appendChild(messageElem);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatResponse(message) {
    let response;

    if (message.toLowerCase().includes('mood tracker')) {
        response = 'The mood tracker is located in the Portfolio section.';
    } else if (message.toLowerCase().includes('neural network')) {
        response = 'You can interact with the neural network visualization in the Portfolio section.';
    } else if (message.toLowerCase().includes('hello')) {
        response = 'Hello! How can I assist you today?';
    } else {
        response = 'I am here to assist you with exploring the features of this website!';
    }

    addMessage('bot', response);
}

// Function to start voice recognition (if supported)
function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        addMessage('bot', 'Sorry, voice recognition is not supported in your browser.');
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        addMessage('user', voiceInput);
        getChatResponse(voiceInput);
    };

    recognition.start();
    addMessage('bot', 'Listening...');
}

export { addMessage, getChatResponse, startVoiceRecognition };
