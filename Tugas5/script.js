
const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("username");
const profile = document.getElementById("profile");
const loading = document.getElementById("loading");
const message = document.getElementById("message");

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();

    profile.innerHTML = "";
    message.textContent = "";
    loading.textContent = "Loading...";

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        if (response.status === 404) {
            throw new Error("User tidak ditemukan");
        }

        if (!response.ok) {
            throw new Error("Terjadi kesalahan saat mengambil data");
        }

        const data = await response.json();

        profile.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar GitHub">

            <h2>${data.name || data.login}</h2>

            <p>${data.bio || "Bio tidak tersedia"}</p>

            <p>
                <strong>Repositori Publik:</strong>
                ${data.public_repos}
            </p>

            <a href="${data.html_url}" target="_blank">
                Lihat Profil GitHub
            </a>
        `;

    } catch (error) {
        message.textContent = error.message;

    } finally {
        loading.textContent = "";
    }
});
