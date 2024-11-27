const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const authTabs = document.getElementById("auth-tabs"); // Add this to target the auth-tabs
const loginScreen = document.getElementById("login-screen");
const registerScreen = document.getElementById("register-screen");
const moodTrackerScreen = document.getElementById("mood-tracker-screen");
const registerButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");

const emojis = document.querySelectorAll(".emoji");
const resultDisplay = document.getElementById("result");
const suggestionDisplay = document.getElementById("suggestion");
const submitButton = document.getElementById("submit");
let selectedEmoji = null;

// Toggle between login and register screens
loginTab.addEventListener("click", () => {
  loginScreen.classList.remove("hidden");
  registerScreen.classList.add("hidden");
});

registerTab.addEventListener("click", () => {
  registerScreen.classList.remove("hidden");
  loginScreen.classList.add("hidden");
});

// Handle registration
registerButton.addEventListener("click", async () => {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const registerData = { username, password };

  try {
    const response = await fetch("https://climberlog.co.uk:8065/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const result = await response.json();
    if (result.status === "approved") {
      alert("Registration approved! You can now log in.");
      registerScreen.classList.add("hidden");
      loginScreen.classList.remove("hidden");
    } else {
      alert(result.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred during registration. Please try again.");
  }
});

// Handle login
loginButton.addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const loginData = { username, password };

  try {
    const response = await fetch("https://climberlog.co.uk:8065/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();
    if (result.status === "approved") {
      sessionStorage.setItem("token", result.token);
      alert(`Login approved. Welcome, ${username}!`);
      // Hide the login/register buttons and login screen, show mood tracker screen
      authTabs.classList.add("hidden"); // Hides the login/register buttons
      loginScreen.classList.add("hidden");
      moodTrackerScreen.classList.remove("hidden");
      logoutButton.classList.remove("hidden");
    } else {
      alert(result.message || "Invalid credentials. Please try again.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login. Please try again.");
  }
});

logoutButton.addEventListener("click", () => {
  moodTrackerScreen.classList.add("hidden");
  authTabs.classList.remove("hidden");
  loginScreen.classList.remove("hidden");
  logoutButton.classList.add("hidden");
});

emojis.forEach((emoji) => {
  emoji.addEventListener("click", () => {
    selectedEmoji = emoji.getAttribute("data-emoji"); // Get the emoji value
    resultDisplay.textContent = `You selected: ${selectedEmoji.charAt(0).toUpperCase() + selectedEmoji.slice(1)}`;

    // Display a suggestion based on the selected emoji
    if (selectedEmoji === "angry") {
      suggestionDisplay.textContent = "Try to take a deep breath and relax.";
    } else if (selectedEmoji === "anxious") {
      suggestionDisplay.textContent = "Have you tried talking to someone?";
    } else if (selectedEmoji === "happy") {
      suggestionDisplay.textContent = "Enjoy the moment, you deserve it!";
    } else if (selectedEmoji === "neutral") {
      suggestionDisplay.textContent =
        "It's okay to feel this way, take it easy!";
    } else if (selectedEmoji === "sad") {
      suggestionDisplay.textContent =
        "Don't hesitate to reach out for support.";
    } else if (selectedEmoji === "tired") {
      suggestionDisplay.textContent = "Make sure to get enough rest tonight!";
    }

    console.log(`Emoji clicked: ${selectedEmoji}`); // Log the selection
  });
});

submitButton.addEventListener("click", async () => {
  if (!selectedEmoji) {
    alert("Please select an emoji before submitting.");
    return;
  }

  const token = sessionStorage.getItem("token");

  const moodData = {
    token: token,
    mood: selectedEmoji,
  };

  try {
    // Send POST request to /record
    const response = await fetch("https://climberlog.co.uk:8065/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(moodData),
    });

    const result = await response.json();

    if (result.status === "approved") {
      alert("Mood submission approved! Thank you.");
      console.log("Mood submission response:", result);
    } else if (result.status === "dropped") {
      alert("Mood submission was dropped. Please try again.");
    } else {
      alert("Unexpected response from the server.");
      console.error("Unexpected response:", result);
    }
  } catch (error) {
    console.error("Error during mood submission:", error);
    alert("An error occurred while submitting your mood. Please try again.");
  }

  console.log("Mood Data:", moodData);
  alert("Mood submitted successfully!");
});
