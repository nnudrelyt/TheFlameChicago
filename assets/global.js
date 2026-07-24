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

  /* --- mobile menu: full-height off-canvas panel that slides in from the
     right. Holds the jump links + phone CTA at the widths where the header
     collapses to logo + hamburger. Elements are resolved fresh on each call
     rather than cached at load, so the handlers always act on the live nodes. --- */
  var lastFocus = null;

  function isMenuOpen() {
    var panel = document.getElementById("menuPanel");
    return !!panel && panel.classList.contains("is-open");
  }

  function setMenu(open, skipFocusRestore) {
    var panel = document.getElementById("menuPanel");
    if (!panel) return;
    var scrim = document.getElementById("menuScrim");
    var closeBtn = document.getElementById("menuClose");
    panel.classList.toggle("is-open", open);
    if (scrim) scrim.classList.toggle("is-on", open);
    document.body.classList.toggle("menu-locked", open);
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    /* inert keeps the off-canvas links out of the tab order (and the a11y
       tree) while the panel is parked off-screen. */
    if (open) {
      panel.removeAttribute("inert");
      lastFocus = document.activeElement;
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    } else {
      panel.setAttribute("inert", "");
      /* preventScroll so restoring focus to the hamburger never yanks the
         page — and skip it entirely when we're following an in-page jump. */
      if (!skipFocusRestore && lastFocus && lastFocus.focus) {
        lastFocus.focus({ preventScroll: true });
      }
    }
  }
  function closeMenu(skipFocusRestore) { setMenu(false, skipFocusRestore); }

  if (toggle && document.getElementById("menuPanel")) {
    toggle.addEventListener("click", function () {
      setMenu(!isMenuOpen());
    });
    var closeBtn = document.getElementById("menuClose");
    var scrim = document.getElementById("menuScrim");
    if (closeBtn) closeBtn.addEventListener("click", function () { closeMenu(); });
    if (scrim) scrim.addEventListener("click", function () { closeMenu(); });
    document.addEventListener("click", function (e) {
      var link = e.target.closest(".menu-panel a");
      if (!link || !isMenuOpen()) return;
      var href = link.getAttribute("href") || "";
      if (href.charAt(0) === "#" && href.length > 1) {
        /* same-page jump: close first (without stealing focus back to the top),
           then drive the scroll ourselves so the close doesn't fight the
           browser's own fragment navigation. */
        var target = document.getElementById(href.slice(1));
        e.preventDefault();
        closeMenu(true);
        if (target) {
          history.pushState(null, "", href);
          target.scrollIntoView();
        }
      } else {
        closeMenu();   /* tel: / external — let the default action run */
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isMenuOpen()) closeMenu();
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
    var spotAt = null;
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(SPOT);
      /* Leaving a card has to hand the glow back to its CSS resting origin.
         These are inline props, so without clearing them the wash would stay
         parked wherever the cursor exited — invisible back when the resting
         opacity was 0, but the wash rests visible now (2026-07-22). */
      if (spotAt && spotAt !== card) {
        spotAt.style.removeProperty("--mx");
        spotAt.style.removeProperty("--my");
      }
      spotAt = card;
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
         chip has to be brought into view or the active state is invisible.
         Advancing glides the strip to the new chip rather than jumping — the
         chips visibly shift left as you move down the list. */
      var ocScrollRAF = null;
      /* NB: scrollTo({behavior:"smooth"}) silently no-ops against this bar's
         scroll-snap container, so tween scrollLeft by hand and suspend snap for
         the duration (snap would otherwise fight the intermediate positions). */
      /* clearing the inline value lets the stylesheet's scroll-snap-type resume;
         restoring to "" (not the captured inline) is what keeps overlapping
         glides from stranding the bar at snap:none forever. */
      function ocSnapResume() { chipBar.style.scrollSnapType = ""; }
      function ocGlideBar(target) {
        var max = chipBar.scrollWidth - chipBar.clientWidth;
        target = Math.max(0, Math.min(target, max));
        if (ocScrollRAF) { cancelAnimationFrame(ocScrollRAF); ocScrollRAF = null; }
        var start = chipBar.scrollLeft, dist = target - start;
        /* reduced-motion or a negligible move: land immediately (and make sure
           an interrupted prior glide didn't leave snap suspended) */
        if (reduce || Math.abs(dist) < 1) { chipBar.scrollLeft = target; ocSnapResume(); return; }
        var t0 = null, dur = 420;
        chipBar.style.scrollSnapType = "none";
        ocScrollRAF = requestAnimationFrame(function step(ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur);
          /* easeInOutQuad */
          var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          chipBar.scrollLeft = start + dist * e;
          if (p < 1) { ocScrollRAF = requestAnimationFrame(step); }
          else { ocScrollRAF = null; ocSnapResume(); }
        });
      }
      function ocRevealChip(i) {
        if (chipBar.scrollWidth <= chipBar.clientWidth) return;
        var barRect = chipBar.getBoundingClientRect();
        var cRect = chips[i].getBoundingClientRect();
        ocGlideBar(chipBar.scrollLeft + (cRect.left - barRect.left) - (barRect.width - cRect.width) / 2);
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
      /* one source of truth for the cadence: the .oc-timer dial's CSS sweep
         reads the same number the interval runs on */
      chooser.style.setProperty("--oc-delay", OC_DELAY + "ms");
      var ocDial = chooser.querySelector(".oc-timer-arc");
      function ocStop() {
        if (ocTimer) { clearInterval(ocTimer); ocTimer = null; }
        chooser.classList.remove("is-auto");
      }
      function ocStart() {
        if (reduce || ocPicked) return;
        ocStop();
        /* Restart the sweep from zero in the same tick the interval begins, or
           a hover pause leaves the dial mid-arc and out of phase. ocStop() has
           just removed .is-auto; without flushing layout here the remove+add
           collapse into no change within the frame and the animation never
           restarts — hence the deliberate forced reflow. */
        if (ocDial) { void ocDial.getBoundingClientRect(); }
        ocTimer = window.setInterval(function () {
          ocSelect((ocShown + 1) % items.length);
        }, OC_DELAY);
        chooser.classList.add("is-auto");
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

      /* Mobile: the photo IS the affordance. The chip bar is a cramped filter
         strip at this width, so tapping the frame steps to the next occasion —
         the same step autoplay takes — and, like picking a chip, retires
         autoplay so a deliberate tap isn't immediately overridden. Pointer-only
         convenience: the chips remain the full keyboard/AT path (arrow keys +
         selection), so this adds nothing to the a11y tree. Gated by the same
         760px breakpoint where the CSS drops the readout below the photo, and
         read live so a resize past the breakpoint just stops advancing. */
      var ocTapMQ = window.matchMedia("(max-width:760px)");
      ocFrame.addEventListener("click", function () {
        if (!ocTapMQ.matches) return;
        ocPicked = true;
        ocStop();
        ocSelect((ocShown + 1) % items.length);
      });

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

  /* --- contact form ---
     Static site, no backend. Submits to Web3Forms, which delivers to
     info@theflamechicago.com. The destination is set by the access_key
     hidden field in index.html, not here — swapping where mail lands means
     issuing a new key, not editing this file.
     Until the key is filled in, the form validates and tells the visitor to call. */
  var FORM_ENDPOINT = "https://api.web3forms.com/submit";
  var cform = document.getElementById("contactForm");
  if (cform) {
    var status = cform.querySelector(".ff-status");
    var setStatus = function (msg, kind) {
      status.textContent = msg;
      status.classList.remove("ok", "err");
      if (kind) status.classList.add(kind);
    };
    cform.addEventListener("submit", function (e) {
      e.preventDefault();
      if (cform.querySelector('[name="_gotcha"]').value) return; // bot
      if (!cform.checkValidity()) { cform.reportValidity(); return; }
      var akey = cform.querySelector('[name="access_key"]');
      if (!FORM_ENDPOINT || !akey || !akey.value) {
        setStatus("Thanks! Email isn't wired up yet — please call (312) 218-7677.", "err");
        return;
      }
      cform.classList.add("is-sending");
      setStatus("Sending…", null);
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(cform)
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        cform.reset();
        setStatus("Got it — we'll be in touch soon.", "ok");
      }).catch(function () {
        setStatus("Something went wrong. Please call (312) 218-7677.", "err");
      }).finally(function () {
        cform.classList.remove("is-sending");
      });
    });
  }

  /* --- first-visit steps: a small pager for the mobile one-card carousel.
     Dots match the step count, the active one tracks whichever card is in
     view, and tapping a dot scrolls to that card. Hidden by CSS on desktop
     where the steps are a grid. --- */
  var stepsRail = document.querySelector(".firststeps .steps");
  if (stepsRail && "IntersectionObserver" in window) {
    var stepEls = Array.prototype.slice.call(stepsRail.querySelectorAll(".step"));
    if (stepEls.length > 1) {
      var stepsDots = document.createElement("div");
      stepsDots.className = "steps-dots";
      stepsDots.setAttribute("aria-hidden", "true");
      var stepDotEls = stepEls.map(function (s, i) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "steps-dot";
        d.addEventListener("click", function () {
          s.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        });
        stepsDots.appendChild(d);
        return d;
      });
      stepsRail.insertAdjacentElement("afterend", stepsDots);
      stepDotEls[0].classList.add("is-on");

      var stepsIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var idx = stepEls.indexOf(e.target);
          stepDotEls.forEach(function (d, n) { d.classList.toggle("is-on", n === idx); });
        });
      }, { root: stepsRail, threshold: 0.6 });
      stepEls.forEach(function (s) { stepsIO.observe(s); });
    }
  }
})();
