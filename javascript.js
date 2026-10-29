const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const year = document.getElementById("year");

// 1. Toggle mobile menu (open or close on click)
menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); 
    navLinks.classList.toggle("active");
});

// 2. Click outside: close the menu if it is currently open when clicking blank areas
document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("active")) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    }
});

// 3. Automatically close the menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// 4. Switch between light and dark themes
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to light theme"
    );
});

// 5. Back to top button logic
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 6. Display the current year
year.textContent = new Date().getFullYear();

// 7. Active navigation link highlighting on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = ""; 
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 30;

    if (isAtBottom) {
        current = sections[sections.length - 1].getAttribute("id");
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 180)) {
                current = section.getAttribute("id");
            }
        });
    }

    navItems.forEach(item => {
        item.classList.remove("active"); 
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active"); 
        }
    });
});

// 8. Image Modal Preview (click image to pop up full-screen view for clear text reading)
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imgModalSrc");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".project-img-wrapper").forEach(wrapper => {
    wrapper.addEventListener("click", () => {
        const img = wrapper.querySelector("img");
        if (img && modal) {
            modal.style.display = "flex";
            modalImg.src = img.src;
        }
    });
});

if (closeModal) {
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
};
