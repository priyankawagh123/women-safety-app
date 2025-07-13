const predefinedMessages = [
    
    "I feel unsafe here",
    "I am in danger, please help!",
    "Followed by someone",
    "Trapped, I need immediate help!",
    "Emergency! Contact police now!",
    "Need help at my location urgently",
    "I have witnessed a suspicious person",
    "I might be in danger soon",
    "Help me track someone suspicious",
    "Send support at my current location"
  ];
  
  function createButtons() {
    const container = document.getElementById("predefinedMessages");
    predefinedMessages.forEach((msg) => {
      const btn = document.createElement("button");
      btn.innerText = msg;
      btn.onclick = () => sendAlert(msg);
      container.appendChild(btn);
    });
  }
  
  function sendAlert(message) {
    if (!navigator.geolocation) {
      document.getElementById("alertStatus").textContent = "Geolocation not supported.";
      return;
    }
  
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const timestamp = new Date().toLocaleString();
  
      const alert = {
        message,
        location: `Lat: ${lat}, Lon: ${lon}`,
        time: timestamp
      };
  
      let alerts = JSON.parse(localStorage.getItem("alerts")) || [];
      alerts.unshift(alert);
      localStorage.setItem("alerts", JSON.stringify(alerts));
  
      document.getElementById("alertStatus").textContent = "Alert sent and saved!";
      showAlerts();
    });
  }
  
  function sendCustomAlert() {
    const msg = document.getElementById("customMessage").value.trim();
    if (msg === "") {
      alert("Please type a message first.");
      return;
    }
    sendAlert(msg);
    document.getElementById("customMessage").value = "";
  }
  
  function showAlerts() {
    const tableBody = document.querySelector("#alertTable tbody");
    const alerts = JSON.parse(localStorage.getItem("alerts")) || [];
    tableBody.innerHTML = "";
  
    alerts.forEach(alert => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${alert.time}</td>
        <td>${alert.message}</td>
        <td>${alert.location}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function sendFeedback() {
    const feedback = document.getElementById("feedback").value.trim();
    const status = document.getElementById("feedbackStatus");
  
    if (feedback === "") {
      status.textContent = "Please enter your feedback.";
      return;
    }
  
    alert("Thank you for your kind feedback!");
    status.textContent = "Feedback submitted successfully!";
    document.getElementById("feedback").value = "";
  }
  
  window.onload = () => {
    createButtons();
    showAlerts();
  };