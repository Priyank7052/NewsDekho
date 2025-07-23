const API_KEY = "pub_591223f73002950303d251bae1d95510a5c9e";
const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=`;

window.onload = () => fetchNews("Delhi"); // Default to Delhi news on page load

async function fetchNews(query) {
    try {
        const res = await fetch(`${API_URL}${encodeURIComponent(query)}&country=in`);
        const data = await res.json();
        if (data.results) {
            displayArticles(data.results);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function displayArticles(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const template = document.getElementById("template-news-card");
    cardsContainer.innerHTML = ""; // Clear existing content

    articles.forEach((article) => {
        const card = template.content.cloneNode(true);
        const newsImg = card.getElementById("news-img");
        const newsTitle = card.getElementById("news-title");
        const newsDesc = card.getElementById("news-desc");
        const newsSource = card.getElementById("news-source");

        // Set image or placeholder
        newsImg.src = article.image_url || "https://via.placeholder.com/400x200";

        // Set title
        newsTitle.textContent = article.title || "Title not available";

        // Truncate description to 80 words
        let description = article.description || "Description not available";
        const words = description.split(/\s+/); // Split by spaces
        if (words.length > 80) {
            description = words.slice(0, 80).join(" ") + " ..."; // Take the first 80 words and add ellipsis
        }
        newsDesc.textContent = description;

        // Format source and date
        newsSource.textContent = `${article.source_id} · ${new Date(
            article.pubDate
        ).toLocaleDateString()}`;

        // Click on card opens the full article
        card.querySelector(".card").onclick = () => {
            window.open(article.link, "_blank");
        };

        cardsContainer.appendChild(card);
    });
}

document.getElementById("search-btn").onclick = () => {
    const query = document.getElementById("search-input").value.trim();
    if (query) fetchNews(query);
};

// Refresh page when title is clicked
function refreshPage() {
    window.location.reload();
}
