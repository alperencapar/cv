// MAGNIFIER

const gallery_card_items_imgs = document.querySelectorAll(
	".gallery-card-item .img-fluid"
);
const img_magnifier_modal = document.querySelector("#img-magnifier-modal");
const img_magnifier = document.querySelector("#img-magnifier");

var img_modal = new bootstrap.Modal(img_magnifier_modal);

function show_magnifier() {
	img_modal.show();
}

function set_photo(src) {
	let img = document.createElement("img");
	img.classList.add("img-fluid");
	img.src = src;
	img_magnifier.replaceChildren(img);
}

gallery_card_items_imgs.forEach((gallery_item_img) => {
	gallery_item_img.addEventListener("click", function (e) {
		set_photo(e.target.src);
		if (img_magnifier.children[0].tagName === "IMG") {
			show_magnifier();
		}
	});
});
