const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Mobile navigation
if (menuToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.textContent = "☰";
  };

  menuToggle.addEventListener("click", () => {
    const opened = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute("aria-label", opened ? "Close menu" : "Open menu");
    menuToggle.textContent = opened ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

// Filter menu dishes
const filterButtons = document.querySelectorAll(".filter");
const dishes = document.querySelectorAll(".dish-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category || "all";

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    dishes.forEach((dish) => {
      dish.hidden =
        category !== "all" && dish.dataset.category !== category;
    });
  });
});

// Open WhatsApp with selected dish
document.querySelectorAll(".order-button").forEach((button) => {
  button.addEventListener("click", () => {
    const dish = button.dataset.dish || "a menu item";
    // Add the restaurant WhatsApp number with country code, without + or spaces.
    // Example format: 2348012345678
    const phone = "";

    const message = `Hello Flavor Haven! I would like to order ${dish}. Please share the ordering details.`;
    const baseUrl = phone
      ? `https://wa.me/${phone}`
      : "https://wa.me/";
    const url = `${baseUrl}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
});

// Current year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
