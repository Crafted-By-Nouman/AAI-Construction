import { equipmentData } from "./data/equipmentData.js";
import { faqsData } from "./data/faqsData.js";
import { projectsData } from "./data/projectsData.js";
import { servicesData } from "./data/servicesData.js";
import { teamData } from "./data/teamData.js";
import { testimonialsData } from "./data/testimonialsData.js";

// DOM Elements
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const servicesGrid = document.querySelector(".services-grid");
const projectsGrid = document.querySelector(".projects-grid");
const equipmentGrid = document.querySelector(".equipment-grid");
const teamGrid = document.querySelector(".team-grid");
const testimonialsContainer = document.getElementById("testimonials-container");
const sliderNav = document.getElementById("slider-nav");
const faqContainer = document.querySelector(".faq-container");
const contactForm = document.getElementById("contact-form");
const requestQuoteBtn = document.getElementById("request-quote-btn");
const projectModal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const modalBody = document.getElementById("modal-body");
const filterBtns = document.querySelectorAll(".filter-btn");
const loadingSpinner = document.querySelector(".loading-spinner");
const counters = document.querySelectorAll(".counter-number");

// Show More buttons
const showAllServicesBtn = document.getElementById("show-all-services");
const showAllProjectsBtn = document.getElementById("show-all-projects");
const showAllEquipmentBtn = document.getElementById("show-all-equipment");
const showAllTeamBtn = document.getElementById("show-all-team");

// Initialize the website
document.addEventListener("DOMContentLoaded", function () {
  // Hide loading spinner after page load
  setTimeout(() => {
    loadingSpinner.classList.add("hidden");
  }, 1000);

  // Generate dynamic content
  generateServices();
  generateProjects();
  generateEquipment();
  generateTeam();
  generateTestimonials();
  generateFAQs();

  // Initialize counters
  initCounters();

  // Add event listeners for show more buttons
  showAllServicesBtn.addEventListener("click", () => showAllItems("services"));
  showAllProjectsBtn.addEventListener("click", () => showAllItems("projects"));
  showAllEquipmentBtn.addEventListener("click", () =>
    showAllItems("equipment")
  );
  showAllTeamBtn.addEventListener("click", () => showAllItems("team"));
});

// Show all items function
function showAllItems(section) {
  const grid = document.querySelector(`.${section}-grid`);
  grid.parentElement.classList.add("show-all");
}

// Generate Services
function generateServices() {
  servicesData.forEach((service, index) => {
    const serviceCard = document.createElement("div");
    serviceCard.className = `service-card ${index >= 3 ? "hidden-item" : ""}`;
    serviceCard.innerHTML = `
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <div class="service-content">
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                    </div>
                `;
    servicesGrid.appendChild(serviceCard);
  });
}

// Generate Projects
function generateProjects() {
  projectsData.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.className = `project-card ${project.category} ${
      index >= 3 ? "hidden-item" : ""
    }`;
    projectCard.setAttribute("data-category", project.category);
    projectCard.setAttribute("data-id", project.id);
    projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.name} project" loading="lazy">
                    <div class="project-overlay">
                        <h3>${project.name}</h3>
                        <p>${project.location}</p>
                    </div>
                `;
    projectCard.addEventListener("click", () => openProjectModal(project.id));
    projectsGrid.appendChild(projectCard);
  });
}

// Generate Equipment
function generateEquipment() {
  equipmentData.forEach((equipment, index) => {
    const equipmentCard = document.createElement("div");
    equipmentCard.className = `equipment-card ${
      index >= 3 ? "hidden-item" : ""
    }`;
    equipmentCard.innerHTML = `
                    <div class="equipment-image">
                        <img src="${equipment.image}" alt="${equipment.name}" loading="lazy">
                    </div>
                    <div class="equipment-content">
                        <h3>${equipment.name}</h3>
                        <p>${equipment.purpose}</p>
                    </div>
                `;
    equipmentGrid.appendChild(equipmentCard);
  });
}

// Generate Team
function generateTeam() {
  teamData.forEach((member, index) => {
    const teamMember = document.createElement("div");
    teamMember.className = `team-member ${index >= 4 ? "hidden-item" : ""}`;
    teamMember.innerHTML = `
                    <div class="member-image">
                        <img src="${member.image}" alt="${member.name}" loading="lazy">
                    </div>
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <div class="member-role">${member.role}</div>
                        <div class="member-bio">${member.bio}</div>
                    </div>
                `;
    teamGrid.appendChild(teamMember);
  });
}

// Generate Testimonials
function generateTestimonials() {
  testimonialsData.forEach((testimonial, index) => {
    const testimonialCard = document.createElement("div");
    testimonialCard.className = "testimonial-card";
    testimonialCard.innerHTML = `
                    <div class="stars">
                        ${'<i class="fas fa-star"></i>'.repeat(
                          testimonial.rating
                        )}
                    </div>
                    <div class="testimonial-text">
                        ${testimonial.text}
                    </div>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="${testimonial.image}" alt="${
      testimonial.name
    }" loading="lazy">
                        </div>
                        <div class="author-info">
                            <h4>${testimonial.name}</h4>
                            <div class="author-role">${testimonial.role}</div>
                        </div>
                    </div>
                `;
    testimonialsContainer.appendChild(testimonialCard);

    // Create slider dots
    const dot = document.createElement("div");
    dot.className = `slider-dot ${index === 0 ? "active" : ""}`;
    dot.setAttribute("data-index", index);
    dot.addEventListener("click", () => goToSlide(index));
    sliderNav.appendChild(dot);
  });
}

// Generate FAQs
function generateFAQs() {
  faqsData.forEach((faq) => {
    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";
    faqItem.innerHTML = `
                    <div class="faq-question">
                        <span>${faq.question}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>${faq.answer}</p>
                    </div>
                `;
    faqItem.addEventListener("click", function () {
      this.classList.toggle("active");
    });
    faqContainer.appendChild(faqItem);
  });
}

// Open Project Modal
function openProjectModal(projectId) {
  const project = projectsData.find((p) => p.id === projectId);
  if (project) {
    modalBody.innerHTML = `
                    <h2>${project.name}</h2>
                    <img src="${project.image}" alt="${project.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
                    <p><strong>Location:</strong> ${project.location}</p>
                    <p><strong>Duration:</strong> ${project.duration}</p>
                    <p><strong>Description:</strong> ${project.description}</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
                        <h3>Client Feedback</h3>
                        <p>"${project.feedback}"</p>
                    </div>
                `;
    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close Modal
modalClose.addEventListener("click", () => {
  projectModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Project Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Testimonial Slider
let currentSlide = 0;
function goToSlide(index) {
  currentSlide = index;
  testimonialsContainer.style.transform = `translateX(-${index * 100}%)`;

  // Update active dot
  document.querySelectorAll(".slider-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Auto slide testimonials
setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialsData.length;
  goToSlide(currentSlide);
}, 5000);

// Header scroll effect
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Mobile menu toggle
hamburger.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  this.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navMenu.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Form validation
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (!name || !email || !phone || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Phone validation (basic)
  const phoneRegex = /^[0-9+\-\s()]{10,}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // If all validations pass
  alert("Thank you for your message! We will get back to you soon.");
  contactForm.reset();
});

// Request Quote button
requestQuoteBtn.addEventListener("click", function () {
  document.getElementById("subject").value = "Request for Quote";
  document.getElementById("message").value =
    "I would like to request a quote for my project. Please provide details about your services and pricing.";

  // Scroll to contact form
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

// Initialize counters
function initCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-count"));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                counter.textContent = target + "+";
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current) + "+";
              }
            }, 16);
          });

          // Stop observing after animation
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe the counters section
  const countersSection = document.getElementById("why-choose-us");
  if (countersSection) {
    counterObserver.observe(countersSection);
  }
}
