/* ==========================================================================
   Grain Archive — archive.js
   - client-side filtering + search (progressive enhancement)
   - works over pre-rendered masonry cards (SEO-friendly)
   ========================================================================== */

(function () {
  "use strict";

  const root = document.querySelector("[data-archive]");
  if (!root) return;

  const input = root.querySelector("[data-search]");
  const chips = Array.from(root.querySelectorAll("[data-chip]"));
  const cards = Array.from(root.querySelectorAll("[data-card]"));
  const empty = root.querySelector("[data-empty]");

  const state = {
    q: "",
    tag: "all",
  };

  const normalize = (s) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const apply = () => {
    const q = normalize(state.q);
    const tag = state.tag;

    let visible = 0;

    cards.forEach((card) => {
      const hay = normalize(card.getAttribute("data-haystack"));
      const tags = (card.getAttribute("data-tags") || "").split(",").map((t) => t.trim());

      const matchQ = q.length === 0 || hay.includes(q);
      const matchTag = tag === "all" || tags.includes(tag);

      const show = matchQ && matchTag;
      card.hidden = !show;

      if (show) visible += 1;
    });

    if (empty) empty.hidden = visible !== 0;
  };

  if (input) {
    input.addEventListener("input", (e) => {
      state.q = e.target.value;
      apply();
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      state.tag = chip.getAttribute("data-chip") || "all";
      apply();
    });
  });

  apply();
})();
