// Load existing videos on page load
window.onload = () => {
  displayVideos();
};

function addVideo() {
  const input = document.getElementById('videoInput');
  let url = input.value.trim();

  if (!isValidYouTubeUrl(url)) {
    alert("Please enter a valid YouTube link.");
    return;
  }

  let videos = JSON.parse(localStorage.getItem('videoLinks')) || [];
  videos.push(url);
  localStorage.setItem('videoLinks', JSON.stringify(videos));

  input.value = '';
  displayVideos();
}

function displayVideos() {
  const container = document.getElementById('videoContainer');
  container.innerHTML = '';

  let videos = JSON.parse(localStorage.getItem('videoLinks')) || [];

  videos.forEach(link => {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.innerHTML = `
      <a href="${link}" target="_blank">
        <img src="https://img.youtube.com/vi/${getYouTubeID(link)}/0.jpg" alt="YouTube Thumbnail" />
      </a>
    `;
    container.appendChild(videoCard);
  });
}

function getYouTubeID(url) {
  let videoID = '';
  if (url.includes("youtube.com/watch?v=")) {
    videoID = new URL(url).searchParams.get("v");
  } else if (url.includes("youtu.be/")) {
    videoID = url.split("youtu.be/")[1].split("?")[0];
  }
  return videoID;
}

function isValidYouTubeUrl(url) {
  return url.includes("youtube.com/watch?v=") || url.includes("youtu.be/");
}
