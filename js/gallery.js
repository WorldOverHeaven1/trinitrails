/* Trini Trails - gallery lightbox (lazy loaded by main.js) */
(function () {
  "use strict";
  var list = document.getElementById("gallery");
  var dlg = document.getElementById("lightbox");
  var img = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");
  if (!list || !dlg || typeof dlg.showModal !== "function") { return; }
  var buttons = Array.prototype.slice.call(list.querySelectorAll("button[data-full]"));
  var index = 0;

  function show(i) {
    index = (i + buttons.length) % buttons.length;
    var b = buttons[index];
    img.src = b.getAttribute("data-full");
    img.alt = b.getAttribute("data-alt");
    cap.textContent = b.getAttribute("data-caption") + " (" + (index + 1) + " of " + buttons.length + ")";
  }
  function open(i) { show(i); if (!dlg.open) { dlg.showModal(); } }

  buttons.forEach(function (b, i) { b.addEventListener("click", function () { open(i); }); });
  document.getElementById("lb-next").addEventListener("click", function () { show(index + 1); });
  document.getElementById("lb-prev").addEventListener("click", function () { show(index - 1); });
  document.getElementById("lb-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) { dlg.close(); } });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { show(index + 1); }
    if (e.key === "ArrowLeft") { show(index - 1); }
  });
})();
