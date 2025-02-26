document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("entries-list")) {
        loadEntries();
    } else if (document.getElementById("entry-detail")) {
        loadSingleEntry();
    }
});

// ✅ Add a new entry (POST request)
function addEntry() {
    const title = document.getElementById("entry-title").value;
    const content = document.getElementById("entry-content").value;

    if (!title || !content) {
        alert("Please fill in all fields.");
        return;
    }

    const entry = { title, content };

    fetch("http://localhost:8080/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry)
    })
    .then(response => response.json())
    .then(() => {
        location.href = "entries.html"; // Redirect to entries list
    })
    .catch(error => console.error("Error:", error));
}

// ✅ Load all entries (GET request)
function loadEntries() {
    const entriesContainer = document.getElementById("entries-list");
    entriesContainer.innerHTML = "";

    fetch("http://localhost:8080/api/entries")
    .then(response => response.json())
    .then(entries => {
        if (entries.length === 0) {
            entriesContainer.innerHTML = "<p>No journal entries yet.</p>";
            return;
        }

        entries.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.classList.add("entry");
            
            entryDiv.innerHTML = `
                <a href="view-entry.html?id=${entry.id}" class="entry-link">
                    <h3>${entry.title}</h3>    
                    <p>${new Date(entry.createdAt).toLocaleDateString()}</p>
                </a>
            `;
            entriesContainer.appendChild(entryDiv);
        });
    })
    .catch(error => console.error("Error loading entries:", error));
}

// ✅ Load a single entry by ID (GET request)
function loadSingleEntry() {
    const urlParams = new URLSearchParams(window.location.search);
    const entryId = urlParams.get("id");

    fetch(`http://localhost:8080/api/entries/${entryId}`)
    .then(response => response.json())
    .then(entry => {
        document.getElementById("entry-detail").innerHTML = `
            <h2>${entry.title}</h2>
            <p><strong>Date:</strong> ${new Date(entry.createdAt).toLocaleDateString()}</p>
            <p>${entry.content}</p>
            <button onclick="deleteEntry(${entry.id})" class="delete_button">✖ Delete Entry</button>
        `;
    })
    .catch(error => console.error("Error loading entry:", error));
}

// ✅ Delete an entry (DELETE request)
function deleteEntry(entryId) {
    fetch(`http://localhost:8080/api/entries/${entryId}`, {
        method: "DELETE"
    })
    .then(() => {
        location.href = "entries.html"; // Redirect after deletion
    })
    .catch(error => console.error("Error deleting entry:", error));
}




/*document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("entries-list")) {
        loadEntries();
    } else if (document.getElementById("entry-detail")) {
        loadSingleEntry();
    }
});

function addEntry() {
    const title = document.getElementById("entry-title").value;
    const content = document.getElementById("entry-content").value;
    const date = new Date().toISOString().split('T')[0]; // Set today's date

    if (!title || !content) {
        alert("Please fill in all fields.");
        return;
    }

    saveEntry(title, date, content);
}

function saveEntry(title, date, content) {
    const entry = { title, date, content };

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.unshift(entry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    location.href = "entries.html"; 
}





function loadEntries() {
    const entriesContainer = document.getElementById("entries-list");
    entriesContainer.innerHTML = "";
    
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    if (entries.length === 0) {
        entriesContainer.innerHTML = "<p>No journal entries yet.</p>";
        return;
    }

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        
        entryDiv.innerHTML = `
            <a href="view-entry.html?index=${index}" class="entry-link">
            <h3>${entry.title}</h3>    
            <p>${entry.date}</p>
            </a>
        `;
    
        entriesContainer.appendChild(entryDiv);
    });
    
} 




function loadSingleEntry() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get("index");
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    if (!entries[index]) return;

    const entry = entries[index];
    document.getElementById("entry-detail").innerHTML = `
    <h2>${entry.title}</h2>
    <p><strong>Date:</strong> ${entry.date}</p>
    <p>${entry.content}</p>
    <button onclick="deleteEntry(${index})" class="delete_button">✖ Delete Entry</button>
`;
}


function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    if (!entries[index]) return;

    entries.splice(index, 1); // Remove the entry from the array
    localStorage.setItem("journalEntries", JSON.stringify(entries)); // Save updated entries

    location.href = "entries.html"; // Redirect to entries list
}

*/





