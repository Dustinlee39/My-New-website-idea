// voice.js - Controls a strobe light effect using voice commands
let strobeInterval;
let strobeColor = '#ff0000';
let strobeSpeed = 1; // Speed in Hz (flashes per second)

function startStrobe() {
    stopStrobe(); // Clear any existing interval
    const intervalTime = 1000 / strobeSpeed; // Convert speed to milliseconds
    strobeInterval = setInterval(() => {
        document.body.style.backgroundColor =
            document.body.style.backgroundColor === strobeColor ? '#000' : strobeColor;
    }, intervalTime);
}

function stopStrobe() {
    clearInterval(strobeInterval);
    document.body.style.backgroundColor = '#000'; // Reset to black
}

function changeStrobeColor(color) {
    strobeColor = color;
    startStrobe(); // Restart strobe with the new color
}

function changeStrobeSpeed(speed) {
    strobeSpeed = Math.max(0.1, Math.min(speed, 10)); // Clamp speed between 0.1 and 10 Hz
    startStrobe(); // Restart strobe with the new speed
}

function processVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('start strobe')) {
        startStrobe();
        addMessage('bot', 'Strobe light started.');
    } else if (lowerCommand.includes('stop strobe')) {
        stopStrobe();
        addMessage('bot', 'Strobe light stopped.');
    } else if (lowerCommand.includes('change color to')) {
        const color = lowerCommand.split('change color to').pop().trim();
        changeStrobeColor(color);
        addMessage('bot', `Strobe light color changed to ${color}.`);
    } else if (lowerCommand.includes('faster')) {
        changeStrobeSpeed(strobeSpeed + 0.5);
        addMessage('bot', `Strobe light speed increased to ${strobeSpeed} Hz.`);
    } else if (lowerCommand.includes('slower')) {
        changeStrobeSpeed(strobeSpeed - 0.5);
        addMessage('bot', `Strobe light speed decreased to ${strobeSpeed} Hz.`);
    } else {
        addMessage('bot', 'I did not understand that command. Please try again.');
    }
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
        processVoiceCommand(voiceInput);
    };

    recognition.start();
    addMessage('bot', 'Listening for strobe light commands...');
}

export { startVoiceRecognition, processVoiceCommand, startStrobe, stopStrobe };
