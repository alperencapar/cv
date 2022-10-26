const fullname_input = document.querySelector("#fullname");
const email_input = document.querySelector("#email");
const subject_input = document.querySelector("#subject");
const message_input = document.querySelector("#message");
const form = document.querySelector("form");

let validation = false;

const modal = document.querySelector("#verification-modal");
var verification_modal = new bootstrap.Modal(modal, {
	keyboard: false
});

const form_elements = [
	(fullname = fullname_input),
	(email = email_input),
	(subject = subject_input),
	(message = message_input)
];

form_elements_data = {
	fullname: null,
	email: null,
	subject: null,
	message: null
};

const is_form_elements_validated = {
	fullname: false,
	email: false,
	subject: false,
	message: false
};

// Regex patterns
const patterns = {
	fullname: /^([a-zA-ZĞÜŞİÖÇığüşöç'-.]{3,60}(?: [a-zA-ZĞÜŞİÖÇığüşöç'-.]+)?)$/,
	email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	subject: null,
	message: /^[a-zA-ZĞÜŞİÖÇığüşöç]{1,}.*/
};

//! FUNCTIONS

// Form Functions Start

//Prevent reload of page
function stop_reload_of_page(e) {
	e.preventDefault();
}

//Testing patterns with form data (each)
function check_is_pattern_valid(value, pattern) {
	if (pattern) return pattern.test(value);
	return true;
}

//Manage each form element validation (visual and --> is_form_elements_validated)
function manage_form_element_validation(element, pattern) {
	if (check_is_pattern_valid(element.value, pattern)) {
		element.classList.add("is-valid");
		element.classList.remove("is-invalid");
		is_form_elements_validated[element.id] = true;
	} else {
		element.classList.remove("is-valid");
		element.classList.add("is-invalid");
		is_form_elements_validated[element.id] = false;
	}
}

function manage_patterns(element) {
	manage_form_element_validation(element, patterns[element.id]);
}

//Save each form element's data to --> form_elements_data
function form_element_data_saver(event) {
	form_elements_data[event.target.id] = event.target.value;
}

function form_elements_event_listeners(element, pattern) {
	element.addEventListener("blur", function () {
		manage_patterns(element);
	});

	element.addEventListener("input", function () {
		manage_patterns(element);
	});

	element.addEventListener("change", function (e) {
		form_element_data_saver(e);
	});
}

//Check form elements validity
function form_validation() {
	const keys = Object.keys(is_form_elements_validated);
	keys.forEach((k) => {
		//checking is_form_elements_validated
		if (is_form_elements_validated[k]) {
			validation = true;
		} else {
			validation = false;
		}
	});

	if (validation) {
		return true;
	} else {
		false;
	}
}

//Touch, blur & input data change event listeners
form_elements.forEach((form_element) => {
	//Touch, blur & input data change event listeners
	form_elements_event_listeners(form_element, patterns[form_element.id]);
});

form.addEventListener("submit", function (e) {
	stop_reload_of_page(e);

	//if form validated
	if (form_validation()) {
		open_verification_modal(); //open modal

		//start captcha
		captcha_start(
			"verify-yourself",
			"6LeB6a4iAAAAAC73XDsrOv4lNLjJfSYFlivkG-9g",
			on_captcha_submit,
			captcha_reset
		);
	}
});

//* Form Functions END

// Open modal
function open_verification_modal() {
	verification_modal.show();
}

// Close modal
function close_verification_modal() {
	verification_modal.hide();
}

//! CAPTCHA FUNCTIONS START

// Init captcha
function captcha_start(
	element_or_id,
	key,
	callback_function,
	expired_callback
) {
	grecaptcha.render(element_or_id, {
		sitekey: key,
		callback: callback_function,
		"data-expired-callback": expired_callback
	});
}

// If needed it will reset the captcha
function captcha_reset() {
	grecaptcha.reset();
}

// Captcha submit handler
function on_captcha_submit(response) {
	form_elements_data["response"] = response;
	// console.info(response);
	console.table(form_elements_data);
	close_verification_modal();
	change_toast_alert("success", "Form submitted successfully!")
	show_toast()
	form.reset()
}
