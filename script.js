
/* ===== MOBILE NAVIGATION ===== */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navigationLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

document.addEventListener("click", event => {
    if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});

/* ===== DARK / LIGHT THEME ===== */
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");

    themeToggle.textContent = isLight ? "☾" : "☀";
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );
});

/* ===== PROJECT FILTERS ===== */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        projectCards.forEach(card => {
            const matches =
                selectedFilter === "all" ||
                card.dataset.category === selectedFilter;

            card.hidden = !matches;
        });
    });
});

/* ===== COPY EMAIL ADDRESS ===== */
const copyEmailButton = document.querySelector("#copy-email");
const copyMessage = document.querySelector("#copy-message");
const emailAddress = "pauluschawong2004@gmail.com";

copyEmailButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(emailAddress);
        copyMessage.textContent = "Email address copied!";
    } catch (error) {
        copyMessage.textContent =
            "Copy unavailable. Please use the email link above.";
    }
});

/* ===== AUTOMATIC COPYRIGHT YEAR ===== */
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

/* ===== ACTIVE NAVIGATION LINK ===== */
const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navigationLinks.forEach(link => {
                    const isActive =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            }
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    pageSections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* ===== ACCESSIBLE PROJECT FILTER STATE ===== */
filterButtons.forEach(button => {
    button.setAttribute(
        "aria-pressed",
        button.classList.contains("active") ? "true" : "false"
    );
});
