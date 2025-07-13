function addVideo() {
    const input = document.getElementById("videoLinkInput");
    const link = input.value.trim();
  
    if (!link) {
      alert("Please paste a video link!");
      return;
    }
  
    let videoLinks = JSON.parse(localStorage.getItem("safetyVideos")) || [];
  
    videoLinks.push(link);
    localStorage.setItem("safetyVideos", JSON.stringify(videoLinks));
  
    input.value = "";
    displayVideos();
  }
  
  function displayVideos() {
    const videoList = document.getElementById("videoList");
    videoList.innerHTML = "";
  
    const links = JSON.parse(localStorage.getItem("safetyVideos")) || [];
  
    links.forEach(link => {
      const embedUrl = convertToEmbedURL(link);
      if (embedUrl) {
        const iframe = document.createElement("iframe");
        iframe.src = embedUrl;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        videoList.appendChild(iframe);
      }
    });
  }
  
  function convertToEmbedURL(url) {
    try {
      // Handle YouTube normal & shorts
      if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
      } else if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtube.com/shorts/")) {
        const id = url.split("/shorts/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      } else if (url.includes("vimeo.com/")) {
        const id = url.split("vimeo.com/")[1];
        return `https://player.vimeo.com/video/${id}`;
      }
  
      // Add more video sources here if needed
  
      // Fallback: Try as direct MP4 or unknown embeddable video
      return url;
    } catch (err) {
      console.error("Invalid video link format.");
      return null;
    }
  }
  
  document.addEventListener("DOMContentLoaded", displayVideos);
  