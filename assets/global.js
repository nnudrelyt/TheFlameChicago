/* The Flame Chicago — global.js */
(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- header background on scroll --- */
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- mobile nav --- */
  function closeNav() {
    if (!nav) return;
    nav.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* --- reveal on scroll --- */
  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduce || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var sibs = Array.prototype.slice.call(el.parentNode.querySelectorAll(":scope > .reveal"));
          var i = sibs.indexOf(el);
          el.style.transitionDelay = (i > 0 ? Math.min(i * 70, 280) : 0) + "ms";
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* --- live pill: real open/closed state (11am–11pm, America/Chicago) --- */
  var pills = Array.prototype.slice.call(document.querySelectorAll(".live"));
  if (pills.length) {
    var hour = new Date().getHours();
    try {
      hour = parseInt(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "America/Chicago" }).format(new Date()), 10);
    } catch (e) { /* fall back to visitor-local time */ }
    var open = hour >= 11 && hour < 23;
    pills.forEach(function (pill) {
      pill.textContent = open ? "Open now · till 11pm" : "Closed · opens 11am";
      pill.setAttribute("aria-label", open ? "Open now until 11pm" : "Closed now, opens at 11am");
      pill.classList.toggle("closed", !open);
    });
  }
})();
