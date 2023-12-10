body {
    margin: 0;
    padding: 0;
    font-family: 'Comic Sans MS', cursive;
    overflow-x: hidden;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: #333;
    transition: background 1s ease-in-out;
}

h1 {
    font-size: 2.5em;
    margin-top: 15px;
    color: #007BFF;
    align-self: flex-start;
}

nav {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.time-box {
    text-align: center;
    margin: 0 20px;
    padding: 10px;
    border: 2px solid #fff; /* Frame color */
    border-radius: 10px; /* Rounded corners */
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

.time-text {
    color: #fff; /* Text color for better readability */
}

footer {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
    width: 100%;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.social-icons {
    margin-top: 10px;
}

.social-icons a {
    display: inline-block;
    margin: 0 10px;
}

.social-icons img {
    width: 20px;
    height: auto;
}