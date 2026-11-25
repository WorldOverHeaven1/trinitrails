/* Trini Trails - shared script (loaded on every page with defer) */
(function () {
  "use strict";

  // Mobile menu
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("hidden") === false;
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  // Lazy-load a non-critical script only when it is needed
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.async = true; s.onload = resolve; s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  // The gallery lightbox script loads when the gallery scrolls near the screen
  var gallery = document.getElementById("gallery");
  if (gallery) {
    var started = false;
    var start = function () {
      if (started) { return; }
      started = true;
      loadScript("js/gallery.js?v=1.0.0");
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) { start(); obs.disconnect(); }
      }, { rootMargin: "300px" }).observe(gallery);
    } else {
      start();
    }
    gallery.addEventListener("click", start, { once: true });
  }
})();
