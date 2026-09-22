// Navbar stuff
const navbar = document.getElementById('navbar');
const links = navbar.querySelectorAll("a[href^='#']");
const updateNavbar = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 0);
    const navbarBottom = navbar.getBoundingClientRect().bottom;

    let activeLink = null;
    links.forEach(link => {
        const id = link.getAttribute("href");
        const section = document.querySelector(id);

        if (!section)
          return;

        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= navbarBottom) {
            activeLink = link;
        }
    });

    links.forEach(link => link.classList.remove("active-zone"));
    if (activeLink) {
        activeLink.classList.add("active-zone");
    }
};

window.addEventListener("scroll", updateNavbar, { passive: true });
window.addEventListener("resize", updateNavbar);
updateNavbar();

// Carousel controls
const carousel = document.querySelector(".carousel");
console.log(carousel)
const track = carousel.querySelector(".carousel_track");
const slides = [...carousel.querySelectorAll(".carousel_slide")];
const prevButton = carousel.querySelector(".carousel_button--prev");
const nextButton = carousel.querySelector(".carousel_button--next");

let carouselIndex = 0;

function setCarouselSlide(index) {
  carouselIndex = Math.max(0, Math.min(index, slides.length - 1));
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  updateCarouselControls();
}

function updateCarouselControls() {
  prevButton.disabled = carouselIndex === 0;
  nextButton.disabled = carouselIndex === slides.length - 1;

  slides.forEach((slide, index) => {
    slide.setAttribute(
      "aria-hidden",
      index === carouselIndex ? "false" : "true"
    );
  });
}

prevButton.addEventListener("click", () => {
  setCarouselSlide(carouselIndex - 1);
});

nextButton.addEventListener("click", () => {
  setCarouselSlide(carouselIndex + 1);
});

updateCarouselControls();

// modal implementation, I spawn the modal when 'About' in Navbar is clicked
const modal = document.querySelector("#modal");
modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
const aboutModal = document.querySelector("#aboutModal");
aboutModal.addEventListener("click", (event) => { event.preventDefault(); modal.showModal(); });
const closeButton = document.querySelector("#closeModal");
closeButton.addEventListener("click", () => { modal.close(); });

// classic automation for "all rights reserved" year thingy
document.getElementById("year").textContent = new Date().getFullYear();
