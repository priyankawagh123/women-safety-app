
  // Function to simulate getting the user's current location
  document.getElementById("get-location-btn").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          document.getElementById(
            "location-status"
          ).textContent = `Location: Latitude ${latitude}, Longitude ${longitude}`;
        },
        () => {
          document.getElementById(
            "location-status"
          ).textContent = "Unable to fetch location. Please enable GPS.";
        }
      );
    } else {
      document.getElementById("location-status").textContent =
        "Geolocation is not supported by your browser.";
    }
  });

  // Function to send location via WhatsApp or Email
  document.getElementById("send-location-btn").addEventListener("click", () => {
    const locationStatus = document.getElementById("location-status").textContent;

    if (locationStatus.startsWith("Location:")) {
      const locationUrl = `https://maps.google.com/?q=${locationStatus.match(/Latitude ([-0-9.]+), Longitude ([-0-9.]+)/)[1]},${locationStatus.match(/Latitude ([-0-9.]+), Longitude ([-0-9.]+)/)[2]}`;
      
      const shareOption = confirm("Do you want to share via WhatsApp? Cancel for Email.");

      if (shareOption) {
        // Open WhatsApp
        const whatsappUrl = `https://api.whatsapp.com/send?text=My%20current%20location:%20${encodeURIComponent(locationUrl)}`;
        window.open(whatsappUrl, "_blank");
      } else {
        // Open Email
        const emailSubject = "My Current Location";
        const emailBody = `Here is my current location: ${locationUrl}`;
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoUrl, "_blank");
      }
    } else {
      alert("Please fetch your location first!");
    }
  });
// Function to send an SOS alert to the nearest police station
document.getElementById("sos-btn").addEventListener("click", () => {
  const locationStatus = document.getElementById("location-status").textContent;

  if (locationStatus.startsWith("Location:")) {
    const match = locationStatus.match(/Latitude ([-0-9.]+), Longitude ([-0-9.]+)/);
    const latitude = match[1];
    const longitude = match[2];

    // Use Google Maps Places API to find the nearest police station
    const googleMapsUrl = `https://www.google.com/maps/search/Police+Station/@${latitude},${longitude},15z`;

    // Construct SOS message
    const sosMessage = `🚨 HELP NEEDED! 🚨\nI am in danger. My current location is Latitude ${latitude}, Longitude ${longitude}. Find the nearest police station: ${googleMapsUrl}`;

    // Ask the user how they want to send the SOS message
    const shareOption = confirm("Do you want to send the SOS message via WhatsApp? Cancel for Email.");

    if (shareOption) {
      // Open WhatsApp
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(sosMessage)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      // Open Email
      const emailSubject = "SOS Alert - Help Needed";
      const emailBody = sosMessage;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoUrl, "_blank");
    }
  } else {
    alert("Please fetch your location first!");
  }
});

// Add new contact functionality
document.getElementById("add-contact-btn").addEventListener("click", () => {
  const newContact = prompt("Enter the name and number of the new contact:");
  if (newContact) {
    const contactList = document.getElementById("contacts-list");
    const newLi = document.createElement("li");
    newLi.textContent = newContact;
    contactList.appendChild(newLi);
  }
});
