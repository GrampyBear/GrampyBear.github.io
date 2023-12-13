// Create a star
function createStar(size) {
    const star = document.createElement('div');
    star.className = `star star-${size}`;
    return star;
}

// Generate random position
function getRandomPosition() {
    const position = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    };
    return position;
}

// Add stars to a container
function addStars(container, count, size) {
    for (let i = 0; i < count; i++) {
        const star = createStar(size);
        const position = getRandomPosition();
        star.style.top = position.top;
        star.style.left = position.left;
        container.appendChild(star);
    }
}

// Generate stars for each layer during night and midnight
function generateStars() {
    const timeOfDay = getTimeOfDay();
    
    if (timeOfDay === 'night' || timeOfDay === 'midnight') {
        addStars(document.getElementById('stars-container1'), 5, 'large');
        addStars(document.getElementById('stars-container2'), 15, 'medium');
        addStars(document.getElementById('stars-container3'), 30, 'small');
    }
}

// Call the function to generate stars
generateStars();
