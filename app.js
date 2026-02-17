document.addEventListener("DOMContentLoaded", () => {
  /* ==================== MENÚ LATERAL ==================== */
  const menuToggle = document.getElementById("menuToggle");
  const sideMenu = document.getElementById("sideMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (menuToggle && sideMenu && closeMenu) {
    menuToggle.addEventListener("click", () => {
      sideMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
      sideMenu.classList.remove("active");
    });
  }

  /* ==================== SLIDER ==================== */
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots");
  document.querySelector(".slider").appendChild(dotsContainer);

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });

    const dots = document.querySelectorAll(".dots span");
    dots.forEach((dot, i) => {
      dot.classList.remove("active");
      if (i === index) dot.classList.add("active");
    });
  }

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(currentSlide);
    });
    dotsContainer.appendChild(dot);
  });

  showSlide(currentSlide);

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlideFunc);

  setInterval(nextSlide, 5000); // auto cada 5s

  /* ==================== CARRUSEL DE CATEGORÍAS ==================== */
  const categoriasCarousel = document.getElementById("categoriasCarousel");
  if (categoriasCarousel) {
    categoriasCarousel.addEventListener("wheel", (e) => {
      e.preventDefault();
      categoriasCarousel.scrollLeft += e.deltaY;
    });
  }

  /* ==================== EFECTOS DE SCROLL ==================== */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".producto, .categoria-item").forEach((el) => {
    observer.observe(el);
  });

  /* ==================== CARRITO ==================== */
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.createElement("span");
  cartCount.id = "cartCount";
  document.querySelector(".user-links").appendChild(cartCount);

  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  updateCartCount();

  document.querySelectorAll(".producto button").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const product = {
        name: document.querySelectorAll(".producto h3")[index].innerText,
        price: document.querySelectorAll(".producto .precio")[index].innerText,
      };
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${product.name} agregado al carrito 🛒`);
    });
  });
});
