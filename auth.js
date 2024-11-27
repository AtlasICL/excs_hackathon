const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginScreen = document.getElementById('login-screen');
const registerScreen = document.getElementById('register-screen');
const moodTrackerScreen = document.getElementById('mood-tracker-screen');
const registerButton = document.getElementById('register-button');
const loginButton = document.getElementById('login-button');

// Toggle between login and register screens
loginTab.addEventListener('click', () => {
    loginScreen.classList.remove('hidden');
    registerScreen.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
    registerScreen.classList.remove('hidden');
    loginScreen.classList.add('hidden');
});

// Handle registration
registerButton.addEventListener('click', async () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    const registerData = { username, password };

    try {
        const response = await fetch('https://climberlog.co.uk:8065/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData),
        });

        const result = await response.json();
        if (result.status === 'approved') {
            alert('Registration approved! You can now log in.');
            registerScreen.classList.add('hidden');
            loginScreen.classList.remove('hidden');
        } else {
            alert(result.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again.');
    }
});

// Handle login
loginButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    const loginData = { username, password };

    try {
        const response = await fetch('https://climberlog.co.uk:8065/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        const result = await response.json();
        if (result.status === 'approved') {
            alert(`Login approved. Welcome, ${username}!`);
            // Hide the login screen and show the mood tracker screen
            loginScreen.classList.add('hidden');
            moodTrackerScreen.classList.remove('hidden');
        } else {
            alert(result.message || 'Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
});
