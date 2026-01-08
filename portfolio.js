document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAV ACTIVE STATE ================= */
  const navLinks = document.querySelectorAll('.ul-list li a');
  const sections = document.querySelectorAll('section');

  function clearActive() {
    navLinks.forEach(link =>
      link.parentElement.classList.remove('active')
    );
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 90,
        behavior: 'smooth'
      });

      clearActive();
      link.parentElement.classList.add('active');
    });
  });

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        clearActive();
        const activeLink = document.querySelector(
          `.ul-list li a[href="#${section.id}"]`
        );
        if (activeLink) activeLink.parentElement.classList.add('active');
      }
    });
  });

  /* ================= REVEAL ON SCROLL ================= */
  const revealElements = document.querySelectorAll(
    '.home-container, .about-container, .projects-container, .services-container, .contact-content'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 120) {
        el.classList.add('active-reveal');
      }
    });
  });

  /* ================= BACK TO TOP ================= */
  const backToTop = document.createElement('div');
  backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  backToTop.id = "back-to-top";
  document.body.appendChild(backToTop);

  backToTop.style.cssText = `
    position: fixed;
    bottom: 35px;
    right: 35px;
    background: #f4b6c2;
    color: white;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 8px 20px rgba(244,182,194,0.45);
    transition: transform 0.3s ease, opacity 0.3s;
  `;

  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 500 ? "flex" : "none";
  });

  backToTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  backToTop.addEventListener('mouseenter', () =>
    backToTop.style.transform = 'scale(1.1)'
  );

  backToTop.addEventListener('mouseleave', () =>
    backToTop.style.transform = 'scale(1)'
  );

  /* ================= CARD HOVER (SOFT UX) ================= */
  const cards = document.querySelectorAll('.project-card, .c1, .service-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  /* ================= TYPING EFFECT ================= */
  const typingElement = document.querySelector('.info-home h3');

  const roles = [
    "UI/UX Designer",
    "Frontend Developer",
    "Design Enthusiast",
    "Web Learner"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = roles[wordIndex];
    typingElement.innerHTML =
      currentWord.substring(0, charIndex) + '<span class="cursor">|</span>';

    if (!deleting && charIndex < currentWord.length) {
      charIndex++;
    } else if (deleting && charIndex > 0) {
      charIndex--;
    } else {
      deleting = !deleting;
      if (!deleting) {
        wordIndex = (wordIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
  }

  typeEffect();

  /* ================= LOADING SCREEN ================= */
  const loadingScreen = document.getElementById("loading-screen");
  const loadingItems = document.querySelectorAll(
    "#loading-text, .main-icon, .sub-icons i, #designer-text"
  );

  loadingItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.remove("hidden");
      el.classList.add("fall");
    }, i * 500);
  });

  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => loadingScreen.style.display = "none", 600);
  }, 3500);

});
