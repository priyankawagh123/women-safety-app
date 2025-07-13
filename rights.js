function showSection(sectionId) {
    const sections = document.querySelectorAll('.law-section');
    const buttons = document.querySelectorAll('.tab-button');
  
    sections.forEach(section => {
      section.classList.remove('active-section');
    });
  
    buttons.forEach(button => {
      button.classList.remove('active');
    });
  
    document.getElementById(sectionId).classList.add('active-section');
    event.target.classList.add('active');
  }
  