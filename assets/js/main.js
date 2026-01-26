/* ==========================================================================
   Grain Archive — main.js
   - mobile nav toggle
   - active nav highlighting
   - footer year
   - progressive enhancement flag (no-js -> js)
   ========================================================================== */

(function () {
  "use strict";

  // remove no-js class (progressive enhancement)
  document.documentElement.classList.remove("no-js");

  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  if (nav && toggle) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    // close on outside click (mobile)
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      const isInside = nav.contains(e.target) || toggle.contains(e.target);
      if (!isInside) closeNav();
    });
  }

  // highlight current link
  const path = window.location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    // normalize href to compare
    const resolved = new URL(href, window.location.href).pathname.replace(/\/$/, "");
    if (resolved === path) a.setAttribute("aria-current", "page");
  });

  // footer year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
