const usernameInput = document.getElementById("username");
const searchBtn = document.querySelector(".link");
const clearBtn = document.getElementById("clear");
const profileContainer = document.querySelector(".profile");

// Fetch GitHub user data
async function fetchGitHubProfile(username) {
    if (username === "") {
        showError("Please enter a GitHub username");
        return;
    }

    profileContainer.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const user = await response.json();
        showProfile(user);

    } catch (error) {
        showError(error.message);
    }
}

// Display profile data
function showProfile(user) {
    profileContainer.innerHTML = `
        <div class="profile-card">
            <img src="${user.avatar_url}" alt="${user.login}">
            <h2>${user.name || user.login}</h2>
            <p class="username">@${user.login}</p>

            <p class="bio">${user.bio || "No bio available"}</p>

            <div class="stats">
                <span>Repos: ${user.public_repos}</span>
                <span>Followers: ${user.followers}</span>
                <span>Following: ${user.following}</span>
            </div>

            <a href="${user.html_url}" target="_blank">
                View GitHub Profile
            </a>
        </div>
    `;
}

// Show error message
function showError(message) {
    profileContainer.innerHTML = `
<p style="
  color: #f3a537ff;
  font-family: 'Times New Roman', Times, serif;
  font-weight:100px;
  font-size: 32px;
  text-align: center;
">
  ${message}
</p>

    `;
}

// Button click
searchBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    fetchGitHubProfile(username);
});

// Enter key support
usernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchGitHubProfile(usernameInput.value.trim());
    }
});

// Clear button
clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    usernameInput.value = "";
    profileContainer.innerHTML = "";
});