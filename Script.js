// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    const button = document.getElementById('cta-button');

    button.addEventListener('click', () => {
        alert('Hello! This button works. Now you can start coding your logic!');
        console.log('Button was clicked successfully.');
    });

});
