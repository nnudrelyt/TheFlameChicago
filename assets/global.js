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

  /* --- jump nav: slide an indicator to the section in view, or to the link
     being rolled over / focused ------------------------------------------
     The bar is built here rather than in the markup — it's decorative, and
     this way the nav degrades to plain links with no stray element. */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a.navlink"));
  if (nav && navLinks.length) {
    var indicator = document.createElement("span");
    indicator.className = "nav-ind";
    indicator.setAttribute("aria-hidden", "true");
    nav.appendChild(indicator);

    var navTargets = navLinks.map(function (a) {
      var id = (a.getAttribute("href") || "").replace(/^#/, "");
      return id ? document.getElementById(id) : null;
    });
    var currentNav = -1;   // the section in view
    var hoverNav = -1;     // the link being pointed at / focused, if any

    function placeIndicator(i) {
      if (i < 0) { indicator.classList.remove("is-on"); return; }
      var linkBox = navLinks[i].getBoundingClientRect();
      var navBox = nav.getBoundingClientRect();
      indicator.style.width = linkBox.width + "px";
      indicator.style.transform = "translateX(" + (linkBox.left - navBox.left) + "px)";
      indicator.classList.add("is-on");
    }

    function setCurrentNav(i) {
      navLinks.forEach(function (a, n) {
        var on = n === i;
        a.classList.toggle("is-current", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      currentNav = i;
      refreshIndicator();
    }

    /* hover wins while it lasts, so a scroll landing mid-hover can't yank the
       bar out from under the pointer; on leave it falls back to the section. */
    function refreshIndicator() {
      placeIndicator(hoverNav >= 0 ? hoverNav : currentNav);
    }

    navLinks.forEach(function (a, i) {
      /* focus is not gated on hover capability — keyboard users exist on
         touch devices too */
      a.addEventListener("focus", function () { hoverNav = i; refreshIndicator(); });
      a.addEventListener("blur", function () { hoverNav = -1; refreshIndicator(); });
      if (window.matchMedia("(hover: hover)").matches) {
        a.addEventListener("pointerenter", function () { hoverNav = i; refreshIndicator(); });
      }
    });
    if (window.matchMedia("(hover: hover)").matches) {
      nav.addEventListener("pointerleave", function () { hoverNav = -1; refreshIndicator(); });
    }

    /* the active section is whichever one is crossing the upper-middle band,
       so the bar changes at roughly the moment the section takes over the view */
    if ("IntersectionObserver" in window) {
      var visible = {};
      var navIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          visible[en.target.id] = en.isIntersecting;
        });
        var next = -1;
        for (var i = 0; i < navTargets.length; i++) {
          if (navTargets[i] && visible[navTargets[i].id]) { next = i; break; }
        }
        if (next !== currentNav) setCurrentNav(next);
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      navTargets.forEach(function (t) { if (t) navIO.observe(t); });
    }

    /* the bar is measured in px, so it has to be re-measured when the nav
       reflows (font swap, resize) */
    window.addEventListener("resize", function () { refreshIndicator(); }, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { refreshIndicator(); });
    }
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

  /* --- spotlight cards: pointer position drives the glow (see v2.css) --- */
  if (window.matchMedia("(hover: hover)").matches) {
    var SPOT = ".step, .faq-item";
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(SPOT);
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    }, { passive: true });
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

  /* --- occasion chooser: pick a reason, see it ---------------------------
     Progressive enhancement: index.html ships the nine occasions as a plain
     <ol>. We only light up the chips + stage once JS is running, and we hold a
     single pair of <img> layers that swap src, so the section costs one photo
     up front instead of nine. */
  var chooser = document.getElementById("occChooser");
  if (chooser) {
    var items = Array.prototype.slice.call(chooser.querySelectorAll(".oc-item")).map(function (li) {
      return {
        chip: li.getAttribute("data-chip"),
        when: li.getAttribute("data-when"),
        from: parseInt(li.getAttribute("data-from"), 10),
        to: parseInt(li.getAttribute("data-to"), 10),
        img: li.getAttribute("data-img"),
        alt: li.getAttribute("data-alt"),
        title: li.querySelector("h3").textContent,
        body: li.querySelector("p").textContent
      };
    });

    if (items.length) {
      var chipBar = chooser.querySelector(".oc-chips");
      var panel = chooser.querySelector(".oc-stage");
      var ocFrame = chooser.querySelector(".oc-frame");
      var whenEl = chooser.querySelector(".oc-when");
      var titleEl = chooser.querySelector(".oc-title");
      var bodyEl = chooser.querySelector(".oc-body");
      var ocWash = chooser.querySelector(".oc-wash");

      /* two stacked layers, crossfaded */
      var ocLayers = [document.createElement("img"), document.createElement("img")];
      ocLayers.forEach(function (im) {
        im.className = "oc-img";
        im.alt = "";
        im.decoding = "async";
        im.setAttribute("aria-hidden", "true");
        ocFrame.insertBefore(im, ocFrame.firstChild);
      });
      var ocActive = 0, ocShown = -1, ocToken = 0;

      items.forEach(function (it, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "oc-chip";
        b.id = "oc-chip-" + i;
        b.setAttribute("role", "tab");
        b.setAttribute("aria-controls", "occPanel");
        b.setAttribute("aria-selected", "false");
        b.tabIndex = -1;
        b.appendChild(document.createTextNode(it.chip));
        chipBar.appendChild(b);
      });
      var chips = Array.prototype.slice.call(chipBar.querySelectorAll(".oc-chip"));

      /* amber (open) → magenta (evening) → violet (last call) */
      var OC_STOPS = [[255, 182, 74], [255, 92, 146], [166, 132, 255]];
      function ocWashAt(t) {
        var s = t * (OC_STOPS.length - 1);
        var i = Math.min(Math.floor(s), OC_STOPS.length - 2);
        var k = s - i;
        var c = OC_STOPS[i].map(function (v, n) { return Math.round(v + (OC_STOPS[i + 1][n] - v) * k); });
        return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (0.2 + t * 0.22).toFixed(2) + ")";
      }

      function ocSwapTo(i) {
        var token = ++ocToken;
        var incoming = ocLayers[1 - ocActive];
        incoming.src = items[i].img;
        incoming.alt = items[i].alt;
        var reveal = function () {
          if (token !== ocToken) return;   // a faster click already won
          incoming.classList.add("is-on");
          incoming.removeAttribute("aria-hidden");
          ocLayers[ocActive].classList.remove("is-on");
          ocLayers[ocActive].setAttribute("aria-hidden", "true");
          ocLayers[ocActive].alt = "";
          ocActive = 1 - ocActive;
        };
        /* NB: img.decode() can stay pending forever while the section is still
           off-screen, so gate on load instead — the crossfade covers the rest. */
        if (incoming.complete && incoming.naturalWidth) reveal();
        else { incoming.onload = reveal; incoming.onerror = reveal; }
      }

      /* the chip bar scrolls horizontally on small screens, so the selected
         chip has to be brought into view or the active state is invisible */
      /* NB: scrollTo({behavior:"smooth"}) silently no-ops against this bar's
         scroll-snap container — assign scrollLeft directly instead. */
      function ocRevealChip(i) {
        if (chipBar.scrollWidth <= chipBar.clientWidth) return;
        var barRect = chipBar.getBoundingClientRect();
        var cRect = chips[i].getBoundingClientRect();
        chipBar.scrollLeft += (cRect.left - barRect.left) - (barRect.width - cRect.width) / 2;
      }

      function ocSelect(i) {
        chips.forEach(function (c, n) {
          var on = n === i;
          c.setAttribute("aria-selected", on ? "true" : "false");
          c.tabIndex = on ? 0 : -1;
        });
        ocRevealChip(i);
        panel.setAttribute("aria-labelledby", "oc-chip-" + i);
        if (i === ocShown) return;
        ocShown = i;

        var mid = (items[i].from + items[i].to) / 2;
        ocWash.style.background = ocWashAt((mid - 660) / 720);

        whenEl.textContent = items[i].when;
        titleEl.textContent = items[i].title;
        bodyEl.textContent = items[i].body;
        ocSwapTo(i);
      }

      /* Ambient auto-advance, same shape as the testimonial carousel: off under
         prefers-reduced-motion, paused while hovering or focused. It stops for
         good the moment someone picks a chip — advancing away from a deliberate
         choice would be worse than having no motion at all. */
      var ocTimer = null, ocPicked = false, OC_DELAY = 3800;
      function ocStop() { if (ocTimer) { clearInterval(ocTimer); ocTimer = null; } }
      function ocStart() {
        if (reduce || ocPicked) return;
        ocStop();
        ocTimer = window.setInterval(function () {
          ocSelect((ocShown + 1) % items.length);
        }, OC_DELAY);
      }

      chips.forEach(function (c, i) {
        c.addEventListener("click", function () { ocPicked = true; ocStop(); ocSelect(i); });
        c.addEventListener("keydown", function (e) {
          var n = -1;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % chips.length;
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + chips.length) % chips.length;
          else if (e.key === "Home") n = 0;
          else if (e.key === "End") n = chips.length - 1;
          else return;
          e.preventDefault();
          ocPicked = true;
          ocStop();
          ocSelect(n);
          chips[n].focus();
        });
      });

      chooser.addEventListener("mouseenter", ocStop);
      chooser.addEventListener("mouseleave", ocStart);
      chooser.addEventListener("focusin", ocStop);
      chooser.addEventListener("focusout", ocStart);

      chooser.classList.add("is-live");
      /* always opens on the first chip, so autoplay reads as a clean sweep down
         the list rather than starting somewhere arbitrary */
      ocSelect(0);

      /* only run the carousel while the section is actually on screen */
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) ocStart(); else ocStop(); });
        }, { threshold: 0.25 }).observe(chooser);
      } else {
        ocStart();
      }

      /* pull the rest of the photography down once the page is idle */
      var ocWarm = function () {
        items.forEach(function (it) { (new Image()).src = it.img; });
      };
      if (window.requestIdleCallback) window.requestIdleCallback(ocWarm, { timeout: 4000 });
      else window.setTimeout(ocWarm, 2500);
    }
  }

  /* --- testimonial carousel (fade-through) --- */
  var car = document.getElementById("tCarousel");
  if (car) {
    var slides = Array.prototype.slice.call(car.querySelectorAll(".tslide"));
    var dots = Array.prototype.slice.call(car.querySelectorAll(".tdot"));
    if (slides.length > 1) {
      var idx = 0, timer = null, DELAY = 5500;
      var show = function (n) {
        idx = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle("is-active", k === idx); });
        dots.forEach(function (d, k) {
          var on = k === idx;
          d.classList.toggle("is-active", on);
          d.setAttribute("aria-selected", on ? "true" : "false");
        });
      };
      var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
      var start = function () { if (reduce) return; stop(); timer = setInterval(function () { show(idx + 1); }, DELAY); };
      dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); start(); }); });
      car.addEventListener("mouseenter", stop);
      car.addEventListener("mouseleave", start);
      car.addEventListener("focusin", stop);
      car.addEventListener("focusout", start);
      start();
    }
  }
})();
