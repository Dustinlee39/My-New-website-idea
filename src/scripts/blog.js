// blog.js - Manages the display and animation of blog posts

const blogContainer = document.getElementById('blog');

const blogPosts = [
    {
        title: "Building a Neural Network in JavaScript",
        date: "October 10, 2024",
        content: "Learn how to build a simple neural network using TensorFlow.js and visualize the training process with Chart.js."
    },
    {
        title: "Creating Interactive Canvas Animations",
        date: "September 25, 2024",
        content: "A step-by-step guide on creating interactive animations using HTML5 Canvas and JavaScript for a dynamic background."
    },
    {
        title: "Voice-Controlled Web Features",
        date: "August 18, 2024",
        content: "Integrate voice recognition into your web projects using the Web Speech API to create interactive experiences like a voice-controlled strobe light."
    }
];

// Function to render blog posts dynamically
function renderBlogPosts() {
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = post.title;

        const dateElement = document.createElement('small');
        dateElement.textContent = post.date;

        const contentElement = document.createElement('p');
        contentElement.textContent = post.content;

        postElement.appendChild(titleElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(contentElement);
        
        blogContainer.appendChild(postElement);
    });
}

// Function to animate blog posts on scroll
function animateBlogPosts() {
    const blogPosts = document.querySelectorAll('.blog-post');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    blogPosts.forEach(post => {
        observer.observe(post);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
    animateBlogPosts();
});
