/* Trini Trails - destination filter and search */
(function () {
  "use strict";
  var items = Array.prototype.slice.call(document.querySelectorAll("#dest-list > li"));
  var chips = Array.prototype.slice.call(document.querySelectorAll("#filters .chip"));
  var search = document.getElementById("search");
  var region = document.getElementById("region");
  var count = document.getElementById("count");
  var empty = document.getElementById("empty");
  var type = "All";

  function apply() {
    var q = search.value.trim().toLowerCase();
    var shown = 0;
    items.forEach(function (li) {
      var ok = (type === "All" || li.dataset.type === type) &&
               (region.value === "all" || li.dataset.region === region.value) &&
               (q === "" || li.dataset.name.indexOf(q) !== -1 || li.textContent.toLowerCase().indexOf(q) !== -1);
      li.hidden = !ok;
      if (ok) { shown++; }
    });
    count.textContent = "Showing " + shown + (shown === 1 ? " place" : " places");
    empty.classList.toggle("hidden", shown !== 0);
  }

  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      type = c.dataset.type;
      chips.forEach(function (x) { x.setAttribute("aria-pressed", String(x === c)); });
      apply();
    });
  });
  search.addEventListener("input", apply);
  region.addEventListener("change", apply);
})();
