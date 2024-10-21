import './chatbot.js';
import './particles.js';
import './voice.js';
import './neuralNetwork.js';
import './blog.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize greeting
    const greeting = document.getElementById('greeting');
    const hour = new Date().getHours();
    if (hour < 12) {
        greeting.textContent = "Good Morning, Tech Enthusiast!";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon, Innovator!";
    } else {
        greeting.textContent = "Good Evening, Visionary!";
    }

    // Initialize voice recognition
    document.getElementById('voiceBtn').addEventListener('click', startVoiceRecognition);
});
