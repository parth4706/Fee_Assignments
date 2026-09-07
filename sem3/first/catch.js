document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("status");
    const listElement = document.getElementById("api-data");

    async function loadUsers() {
        try {
            statusElement.textContent = "Loading data...";

            const response = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const users = await response.json();
            statusElement.textContent = "Data loaded successfully.";

            listElement.innerHTML = users
                .map((user) => `
                    <li>
                        <strong>${user.name}</strong><br>
                        <span>${user.email}</span><br>
                        <small>${user.company.name}</small>
                    </li>
                `)
                .join("");
        } catch (error) {
            statusElement.textContent = "Failed to load data.";
            listElement.innerHTML = `<li>${error.message}</li>`;
            console.error(error);
            

            


        }
    }

    loadUsers();
});
