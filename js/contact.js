/* Trini Trails - contact form validation (name, email, address, telephone) */
(function () {
  "use strict";
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (!form) { return; }

  var rules = {
    name: function (v) {
      return /^[A-Za-z][A-Za-z '.-]{1,59}$/.test(v) ? "" : "Use letters only, at least 2 characters.";
    },
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email, e.g. name@example.com.";
    },
    address: function (v) {
      return v.length >= 8 && /\d/.test(v) && /[A-Za-z]{3}/.test(v) ? "" : "Enter a full address with a number and street name.";
    },
    tel: function (v) {
      var digits = v.replace(/\D/g, "");
      return /^\+?[\d\s().-]+$/.test(v) && digits.length >= 7 && digits.length <= 15 ? "" : "Enter a valid phone number, e.g. 868-555-0142.";
    },
    message: function (v) {
      return v.length === 0 || v.length >= 10 ? "" : "Messages must be at least 10 characters.";
    }
  };

  function check(field) {
    var input = form.elements[field];
    var msg = rules[field](input.value.trim());
    document.getElementById(field + "-err").textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return msg === "";
  }

  Object.keys(rules).forEach(function (f) {
    form.elements[f].addEventListener("blur", function () { check(f); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    var ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) {
      status.textContent = "Please fix the highlighted fields.";
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) { firstBad.focus(); }
      return;
    }
    var demo = form.action.indexOf("YOUR_FORM_ID") !== -1;
    if (demo) {
      status.textContent = "Thank you! Your details passed validation. (Demo mode: add a real form handler address to send the message.)";
      form.reset();
      return;
    }
    fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) {
        status.textContent = r.ok ? "Thank you! Your message was sent." : "Sorry, the message could not be sent. Please try again.";
        if (r.ok) { form.reset(); }
      })
      .catch(function () { status.textContent = "Network error. Please try again."; });
  });
})();
