// timeline.js - Manages the display of an interactive coding journey timeline

const timelineContainer = document.querySelector('.timeline');

const timelineEvents = [
    {
        year: "2022",
        title: "Started Learning JavaScript",
        description: "Began my journey with JavaScript, exploring the fundamentals of the language and building small projects."
    },
    {
        year: "2023",
        title: "Built First Web Application",
        description: "Created a basic web application using HTML, CSS, and JavaScript, which allowed users to manage their daily tasks."
    },
    {
        year: "2024",
        title: "Integrated TensorFlow.js",
        description: "Integrated machine learning models using TensorFlow.js, making interactive AI demos directly in the browser."
    },
    {
        year: "2025",
        title: "Launched My Jarvis-Inspired Website",
        description: "Built and launched this Jarvis-inspired website, combining interactivity with advanced animations and features."
    }
];

// Function to render the timeline events
function renderTimeline() {
    timelineEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';

        const yearElement = document.createElement('div');
        yearElement.className = 'timeline-year';
        yearElement.textContent = event.year;

        const detailsElement = document.createElement('div');
        detailsElement.className = 'timeline-details';

        const titleElement = document.createElement('h3');
        titleElement.textContent = event.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = event.description;

        detailsElement.appendChild(titleElement);
        detailsElement.appendChild(descriptionElement);

        eventElement.appendChild(yearElement);
        eventElement.appendChild(detailsElement);
        timelineContainer.appendChild(eventElement);
    });
}

// Function to animate timeline events when they come into view
function animateTimeline() {
    const events = document.querySelectorAll('.timeline-event');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    events.forEach(event => observer.observe(event));
}

document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    animateTimeline();
});
