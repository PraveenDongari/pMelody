const API_KEY = '278a7db2ce0103b455646d9b35c80fe9d0f156e8'; // Your Serper.dev API Key

async function searchYouTube() {
  const userInput = document.getElementById("search-input").value.trim();
  const query = `${userInput} song`; // Focus on songs
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Searching...</p>";

  if (!userInput) {
    resultsDiv.innerHTML = "<p>Please enter a song or artist name.</p>";
    return;
  }

  try {
    const response = await fetch('https://google.serper.dev/videos', {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: query })
    });

    const data = await response.json();
    resultsDiv.innerHTML = "";

    if (!data.videos || data.videos.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    // Filter out Shorts
    const filteredVideos = data.videos.filter(video => !video.link.includes("/shorts/"));

    if (filteredVideos.length === 0) {
      resultsDiv.innerHTML = "<p>Only Shorts were found. Try a different search.</p>";
      return;
    }

    // Show only the first non-short link
    const topVideo = filteredVideos[0];
    resultsDiv.innerHTML = `<p><a href="${topVideo.link}" target="_blank">${topVideo.link}</a></p>`;

  } catch (error) {
    resultsDiv.innerHTML = "<p>Error occurred. Check console.</p>";
    console.error("Error fetching Serper videos:", error);
  }
}
