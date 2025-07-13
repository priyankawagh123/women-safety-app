document.getElementById("newsForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const date = document.getElementById("date").value;
  
    if (!title || !content || !date) {
      alert("Please fill out all fields.");
      return;
    }
  
    const newsItem = { title, content, date };
  
    let newsList = JSON.parse(localStorage.getItem("uploadedNews")) || [];
    newsList.unshift(newsItem);
    localStorage.setItem("uploadedNews", JSON.stringify(newsList));
  
    displayUploadedNews();
    this.reset();
  });
  
  function displayUploadedNews() {
    const newsList = JSON.parse(localStorage.getItem("uploadedNews")) || [];
    const newsDisplay = document.getElementById("newsDisplay");
    newsDisplay.innerHTML = "";
  
    if (newsList.length === 0) {
      newsDisplay.innerHTML = "<p class='no-news'>No articles uploaded yet.</p>";
      return;
    }
  
    newsList.forEach(news => {
      const div = document.createElement("div");
      div.classList.add("news-item");
      div.innerHTML = `
        <div class="news-header">
          <h4>${news.title}</h4>
          <small>${news.date}</small>
        </div>
        <p>${news.content}</p>
      `;
      newsDisplay.appendChild(div);
    });
  }
  
  displayUploadedNews();
  

  const newsList = document.getElementById('news-list');

// Example static news - replace with dynamic API later if needed
const newsArticles = [
  {
    title: "Pune Rape Case News | Pune Woman Raped In Middle Of Bus Stand, Near Police Station",
    link: "https://youtu.be/ccVjvcnG_lI?si=DIZMk0NDmcII95cO"
  },
  {
    title: "Nashik Kidnap",
    link: "https://youtu.be/7HTRbyaMfqk?si=aZkOdr0cZWAq43ZR"
  },
  {
    title: "22-year-old woman kidnapped, gangraped in moving car - Haryana News",
    link: "https://youtu.be/ueiOZfUUNYM?si=xweTgemFRfcVStHw"
  }
];

newsArticles.forEach(article => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${article.link}" target="_blank">${article.title}</a>`;
  newsList.appendChild(li);
});
