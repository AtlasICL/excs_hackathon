const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const registerScreen = document.getElementById('register-screen');

loginTab.addEventListener('click', () => {
    loginScreen.classList.remove('hidden');
    registerScreen.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
    registerScreen.classList.remove('hidden');
    loginScreen.classList.add('hidden');
});


const registerButton = document.getElementById('register-button');

registerButton.addEventListener('click', async () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    // Create JSON object for registration
    const registerData = {
        username: username,
        password: password
    };

    // Send JSON to the /register path
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData)
        });

        const result = await response.json();
        if (result.status === 'approved') {
            alert('Registration approved! Token: ' + result.token);
        } else if (result.status === 'dropped') {
            alert('Registration was dropped. Please try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again.');
    }
});

if (result.status === 'approved') {
    alert('Registration approved! You can now log in.');
    registerScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
}
