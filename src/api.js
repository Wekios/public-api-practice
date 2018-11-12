// Initialize App
const app = document.getElementById("app");

// Container for the app
const container = document.createElement("div");
container.setAttribute("class", "container");
app.appendChild(container);

// Request to the API
const request = new XMLHttpRequest();
request.open("GET", "http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=serbia&api_key=1283e05adcd56a05b8a0296d1b831b90&format=json", true);
request.onload = function() {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.topartists.artist.forEach(artist => {
            const card = document.createElement("div");
            card.setAttribute("class", "card");

            const h2 = document.createElement("h2");
            h2.textContent = artist.name;

            // Who the fuck puts hashes in json? Why not image.url?
            const image = artist.image[4]['#text'];

            const p = document.createElement("p");
            p.textContent = `Number of listeners: ${artist.listeners}...`;

            container.appendChild(card);
            card.appendChild(h2);
            card.appendChild(p);
            card.style.backgroundImage = `url('${image}')`;
        });
    } else {
        const errorMessage = document.createElement("h1");
        errorMessage.textContent = `Ooops! Something went wrong. Looks like API is unavailable at the moment. Try later!`;
        app.appendChild(errorMessage);
    }
};

request.send();
