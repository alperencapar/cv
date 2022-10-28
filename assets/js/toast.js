var toastElList = [].slice.call(document.querySelectorAll(".toast"));

var toast_alert_el = document.querySelector("#form-submit-toast .alert")
var toast_alert_msg_el = document.querySelector("#form-submit-toast #alert-msg")
    
var toast_options = {
    autohide: true,
    animation: true,
    delay: 9000
}

var toastList = toastElList.map(function (toastEl) {
	return new bootstrap.Toast(toastEl, toast_options);
});

var toast_element = document.querySelector("#form-submit-toast")
var form_toast = bootstrap.Toast.getInstance(toast_element)

function show_toast() {
    form_toast.show()
}

function hide_toast() {
    form_toast.hide()
}

function change_toast_alert(status, msg) {
    const alert_class = `alert-${status}`
    toast_alert_el.classList.add(alert_class)
    toast_alert_msg_el.textContent = msg
}