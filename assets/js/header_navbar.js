//! NAVBAR ACTIVE SECTION HANDLER

const sections = document.querySelectorAll("section");
const nav_links = document.querySelectorAll(".nav-link");

document.onscroll = function () {
	sections.forEach((section) => {
		if (section.offsetTop <= Number(pageYOffset + 300)) {
			nav_links.forEach((nav_link) => {
				if (nav_link.href.split("#")[1] === section.id) {
					nav_link.classList.add("active");
				} else {
					nav_link.classList.remove("active");
				}
			});
		}
	});
};

//? Offcanvas hide when clicked nav_link
nav_links.forEach((nav_link) => {
	nav_link.addEventListener("click", function () {
		const mobile_offcanvas = document.querySelector(".offcanvas");
		const offcanvas = bootstrap.Offcanvas.getInstance(mobile_offcanvas);
		offcanvas.hide();
	});
});
