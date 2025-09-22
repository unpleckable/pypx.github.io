// Navbar
const header = document.querySelector("#header");
const navLinks = document.querySelectorAll("#header .nav-link");
const navToggler = document.querySelector("#header .navbar-toggler");
const togglerIcon = navToggler.querySelector("span");

// Sections for scroll detection
const sections = document.querySelectorAll("section[id]");

// Handle click navigation
navLinks.forEach((link) => {
	link.onclick = function (e) {
		e.preventDefault();
		const targetId = link.getAttribute("href");
		if (targetId && targetId.startsWith("#")) {
			const targetSection = document.querySelector(targetId);
			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		}
	};
});

// Toggle mobile menu
navToggler.onclick = function () {
	header.classList.toggle("active");
	togglerIcon.classList.toggle("fa-xmark");
};

// Scroll-based active navigation
function updateActiveNavLink() {
	let current = "";
	const scrollPosition = window.scrollY + 100; // Offset for better detection

	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		const sectionId = section.getAttribute("id");

		if (
			scrollPosition >= sectionTop &&
			scrollPosition < sectionTop + sectionHeight
		) {
			current = sectionId;
		}
	});

	// Update active nav link
	navLinks.forEach((link) => {
		link.classList.remove("active");
		if (link.getAttribute("href") === `#${current}`) {
			link.classList.add("active");
		}
	});
}

// Change background when scroll
function changeBackground() {
	if (scrollY > 100) {
		header.classList.add("scroll-bg");
	} else {
		header.classList.remove("scroll-bg");
	}
}

// Combined scroll handler
window.onscroll = function () {
	changeBackground();
	updateActiveNavLink();
};

// Initialize
changeBackground();
updateActiveNavLink();
