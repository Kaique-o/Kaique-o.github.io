/* ==========================================================================
   Grain Archive — toc.js
   - builds a Table of Contents from article headings (H2/H3)
   - updates active item while scrolling
   - reading progress bar
   ========================================================================== */

(function () {
  "use strict";

  const article = document.querySelector("[data-article]");
  const toc = document.querySelector("[data-toc]");
  const progress = document.querySelector("[data-progress] > div");

  if (!article || !toc) return;

  const headings = Array.from(article.querySelectorAll("h2, h3"));

  const slugify = (s) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60);

  // ensure ids + build toc
  const items = headings.map((h) => {
    if (!h.id) h.id = slugify(h.textContent);
    return { id: h.id, text: h.textContent, level: h.tagName.toLowerCase() };
  });

  toc.innerHTML = items
    .map((it) => {
      const indent = it.level === "h3" ? " style=\"padding-left:18px; opacity:.9\"" : "";
      return `<a href="#${it.id}"${indent}>${it.text}</a>`;
    })
    .join("");

  const links = Array.from(toc.querySelectorAll("a"));

  const setActive = (id) => {
    links.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === `#${id}` ? "true" : "false"));
  };

  const onScroll = () => {
    // progress
    if (progress) {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, pct)).toFixed(2)}%`;
    }

    // active heading
    const offset = 120; // header + breathing room
    let current = items[0]?.id;

    for (const it of items) {
      const el = document.getElementById(it.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top - offset <= 0) current = it.id;
      else break;
    }
    if (current) setActive(current);
  };

  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
